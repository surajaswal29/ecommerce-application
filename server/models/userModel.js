const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")
const { USER_DEFAULT_AVATAR } = require("../utils/constants")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [30, "Maxlength 30 Characters"],
      minLength: [4, "MinLength 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    phone: {
      type: String,
      validate: {
        validator: (value) => !value || validator.isMobilePhone(value, "en-IN"),
        message: "Please enter a valid phone number",
      },
      default: null,
    },
    dob: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      validate: {
        validator: (value) =>
          !value || ["male", "female", "other"].includes(value),
        message: "Please enter a valid gender",
      },
      default: null,
    },
    bio: {
      type: String,
      validate: {
        validator: (value) => !value || value.length <= 200,
        message: "Bio should be less than 200 characters",
      },
      default: "",
    },
    interests: [String],
    address: [
      {
        label: {
          type: String,
          validate: [
            (value) => ["home", "office", "other"].includes(value),
            "Please enter a valid label",
          ],
          default: "home",
        },
        city: {
          type: String,
          default: "",
          required: true,
        },
        state: {
          type: String,
          default: "",
          required: true,
        },
        country: {
          type: String,
          default: "",
          required: true,
        },
        zipCode: {
          type: String,
          default: "",
          required: true,
        },
        address: {
          type: String,
          default: "",
        },
        priority: {
          type: String,
          validate: {
            validator: (value) => ["primary", "secondary"].includes(value),
            message: "Please enter a valid priority",
          },
          default: "primary",
        },
      },
    ],
    password: {
      type: String,
      required: [true, "Please enter your password"],
      select: false,
      minLength: [8, "minimum length is 8."],
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "user",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    emailVerificationOTP: Number,
    emailVerificationExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
  this.avatar =
    USER_DEFAULT_AVATAR.find((item) => item.gender === this?.gender)?.avatar ||
    USER_DEFAULT_AVATAR[0].avatar
})

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Compare password
userSchema.methods.comparePassword = async function (enteredpasssword) {
  return bcrypt.compare(enteredpasssword, this.password)
}

module.exports = mongoose.model("User", userSchema, "users")
