import mongoose, { Schema, Document, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { Constant, Types } from '../utils';

const userSchema = new Schema<Types.IUserDocument>(
  {
    name: {
      type: String,
      maxLength: [30, 'Maxlength 30 Characters'],
      minLength: [4, 'MinLength 4 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      validate: {
        validator: (value: string) =>
          !value || validator.isMobilePhone(value, 'en-IN'),
        message: 'Please enter a valid phone number',
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
        validator: (value: string) =>
          !value || ['male', 'female', 'other'].includes(value),
        message: 'Please enter a valid gender',
      },
      default: null,
    },
    bio: {
      type: String,
      validate: {
        validator: (value: string) => !value || value.length <= 200,
        message: 'Bio should be less than 200 characters',
      },
      default: '',
    },
    interests: [String],
    address: [
      {
        label: {
          type: String,
          validate: {
            validator: (value: string) =>
              ['home', 'office', 'other'].includes(value),
            message: 'Please enter a valid label',
          },
          default: 'home',
        },
        city: {
          type: String,
          required: true,
          default: '',
        },
        state: {
          type: String,
          required: true,
          default: '',
        },
        country: {
          type: String,
          required: true,
          default: '',
        },
        zipCode: {
          type: String,
          required: true,
          default: '',
        },
        address: {
          type: String,
          default: '',
        },
        priority: {
          type: String,
          validate: {
            validator: (value: string) =>
              ['primary', 'secondary'].includes(value),
            message: 'Please enter a valid priority',
          },
          default: 'primary',
        },
      },
    ],
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      select: false,
      minLength: [8, 'minimum length is 8.'],
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: 'user',
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
);

userSchema.pre<Types.IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  this.avatar =
    Constant.USER_DEFAULT_AVATAR.find((item) => item.gender === this.gender)
      ?.avatar || Constant.USER_DEFAULT_AVATAR[0].avatar;
  next();
});

// JWT TOKEN
userSchema.methods.getJWTToken = function (): string {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare password
userSchema.methods.comparePassword = function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

const User: Model<Types.IUserDocument> = mongoose.model<Types.IUserDocument>(
  'User',
  userSchema,
  'users'
);

export default User;
