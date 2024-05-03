const ErrorHandler = require("../utils/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require("../models/userModel")
// const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const dayjs = require("dayjs")
const { uploadToCloudinary } = require("../utils/uploadImage")
const {
  GENERATE_OTP,
  dataEncryption,
  resetPasswordToken,
  generateHash,
  checkValidKey,
} = require("../utils/constants")

// register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { email, password, uname } = req.body

  if (!email || !password || !uname) {
    return next(new ErrorHandler("Please Enter All Fields", 400))
  }

  const checkUserExist = await User.findOne({
    email,
  })
  console.log(checkUserExist)
  if (checkUserExist) {
    return next(new ErrorHandler("User already exists", 400))
  }

  const otp = await GENERATE_OTP()

  req.body.name = uname
  req.body.emailVerificationOTP = otp
  req.body.emailVerificationExpire = Date.now() + 30 * 1000

  const user = await User.create(req.body)

  if (user) {
    sendEmail.email_verification_mail({
      to: email,
      html: {
        userName: uname,
        otp,
      },
    })

    return res.status(200).json({
      success: true,
      message:
        "Verification email sent! Please check your inbox to complete signup",
    })
  }
})

// verify email for user registration
exports.verifyEmail = catchAsyncError(async (req, res, next) => {
  const { email, otp } = req.body

  if (typeof otp !== "number") {
    return next(
      new ErrorHandler("Invalid OTP: OTP must be of Number type", 400)
    )
  }
  if (!email || !otp) {
    return next(new ErrorHandler("Please Enter All Fields", 400))
  }

  const user = await User.findOne({ email })

  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }

  if (user.emailVerificationOTP !== otp) {
    return next(new ErrorHandler("Invalid OTP", 400))
  }

  if (user.emailVerificationExpire < Date.now()) {
    return next(new ErrorHandler("OTP Expired", 400))
  }

  user.emailVerified = true
  user.active = true
  user.emailVerificationOTP = null
  user.emailVerificationExpire = null

  await user.save()

  return res.status(200).json({
    success: true,
    message: "Email verified and user registered successfully!",
  })
})

// resend otp
exports.resendOTP = catchAsyncError(async (req, res, next) => {
  const { email } = req.body

  if (!email) {
    return next(new ErrorHandler("Please Enter Email", 400))
  }

  const user = await User.findOne({ email })

  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }

  if (user.emailVerificationExpire > Date.now()) {
    return next(
      new ErrorHandler("OTP already sent. please wait for 2 Minutes", 400)
    )
  }

  const otp = await GENERATE_OTP()

  user.emailVerificationOTP = otp
  user.emailVerificationExpire = Date.now() + 30 * 1000

  await user.save()

  sendEmail.email_verification_mail({
    to: email,
    html: {
      userName: user.name,
      otp,
    },
  })

  return res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  })
})

// upload user image
exports.uploadImage = catchAsyncError(async (req, res) => {
  const uploadFile = await uploadToCloudinary(req)

  return res.status(200).json(uploadFile)
})

// login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorHandler("please Enter Email & Password", 400))
  }

  const user = await User.findOne({
    email,
    emailVerified: true,
    active: true,
  }).select("+password")

  if (!user) {
    return next(new ErrorHandler("User does not exist", 401))
  }

  const isPasswordMatched = await user.comparePassword(password)

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Wrong Password or Email", 401))
  }

  const jwtToken = await user.getJWTToken()

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'development' ? true : "none",
    secure: !process.env.NODE_ENV === 'development',
  }

  return res.status(200).cookie("shopio_token", jwtToken, options).json({
    success: true,
    message: "Login Successfully",
    token: jwtToken,
  })
})

// Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("shopio_token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(200).json({
    status: true,
    message: "Logged Out",
  })
})

// Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }

  // Get ResetPassword Token
  const resetToken = await resetPasswordToken()
  const tokenHash = await generateHash(resetToken)

  // Password Reset URL
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`

  const sendMail = sendEmail.password_reset_mail({
    to: user.email,
    html: {
      userName: user.name,
      resetLink: resetPasswordUrl,
    },
  })

  if (sendMail) {
    const updateToken = await User.findByIdAndUpdate(user._id, {
      resetPasswordToken: tokenHash,
      resetPasswordExpire: Date.now() + 10 * 60 * 1000,
    })

    if (updateToken) {
      res.status(200).json({
        success: true,
        resetPasswordUrl,
        message: "Reset Password Link sent to your email",
      })
    }
  } else {
    return next(new ErrorHandler("Email not sent", 400))
  }
})

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const { password, confirmPassword } = req.body
  // creating token hash
  const resetTokenHash = await generateHash(req.params.token)

  const user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new ErrorHandler("Invalid Token or expired", 400))
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400))
  }

  user.password = password
  user.resetPasswordToken = null
  user.resetPasswordExpire = null

  await user.save()

  return res
    .status(200)
    .cookie("shopio_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Password Updated Successfully",
    })
})

// Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }

  // const encryptData = dataEncryption(user)

  res.status(200).json({
    success: true,
    user,
  })
})

// Change Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password")

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400))
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400))
  }

  user.password = req.body.newPassword

  await user.save()

  sendToken(user, 200, res)
})

// Update Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const updateAllowed = ["name", "phone", "dob", "gender", "bio", "avatar"]

  const isValidKey = checkValidKey(updateAllowed, req.body)

  console.log(isValidKey)

  if (!isValidKey.isValid) {
    return next(
      new ErrorHandler(
        `Invalid key: ${isValidKey.key}. Valid are: ${updateAllowed.join(
          ", "
        )}`,
        400
      )
    )
  }

  if (!dayjs(req.body.dob, "YYYY-MM-DD", true).isValid()) {
    return next(
      new ErrorHandler(
        "Invalid date of birth format. Allowed format is YYYY-MM-DD",
        400
      )
    )
  }

  if (req.body.dob) {
    req.body.dob = dayjs(req.body.dob).format("YYYY-MM-DD")
  }

  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  if (!user) {
    return next(new ErrorHandler("cannot update user", 400))
  }

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  })
})

// update or add user address
exports.updateUserAddress = catchAsyncError(async (req, res, next) => {
  const keyAllowed = [
    "label",
    "city",
    "state",
    "country",
    "zipCode",
    "address",
    "priority",
  ]

  const isValidKey = checkValidKey(keyAllowed, req.body)

  if (!isValidKey.isValid) {
    return next(
      new ErrorHandler(
        `Invalid key: ${isValidKey.key}. Valid keys are: ${keyAllowed.join(
          ", "
        )}`,
        400
      )
    )
  }

  if (req.query.addressId) {
    const updateData = {}

    for (const key in req.body) {
      if (keyAllowed.includes(key)) {
        updateData[`address.$[elem].${key}`] = req.body[key]
      }
    }

    console.log(updateData)

    const updateExistAddress = await User.findOneAndUpdate(
      {
        _id: req.user._id,
        "address._id": req.query.addressId,
      },
      {
        $set: updateData,
      },
      {
        arrayFilters: [{ "elem._id": req.query.addressId }],
        new: true,
        useFindAndModify: false,
        runValidators: true,
      }
    )

    if (updateExistAddress) {
      return res.status(200).json({
        success: true,
        message: "Address updated successfully",
        data: updateExistAddress,
      })
    }
  }

  const updateAddress = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        address: req.body,
      },
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )

  if (!updateAddress) {
    return next(new ErrorHandler("Error", 400))
  }
  return res.status(200).json({
    success: true,
    message: "New address added successfully",
    data: updateAddress,
  })
})

exports.deleteUserAddress = catchAsyncError(async (req, res, next) => {
  const deleteAddress = await User.findOneAndUpdate(
    {
      _id: req.user._id,
      "address._id": req.params.addressId,
    },
    {
      $pull: {
        address: {
          _id: req.params.addressId,
        },
      },
    },
    {
      new: true,
    }
  )

  if (!deleteAddress) {
    return next(new ErrorHandler("Error", 400))
  }

  return res.status(200).json({
    success: true,
    message: "Address deleted successfully",
    data: deleteAddress,
  })
})

// Get All Users ----> (Admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  // get all users
  const users = await User.find()

  res.status(200).json({
    success: true,
    usersFound: `${users.length} users found`,
    users,
  })
})

// Get Single User Details ----> (Admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with ${req.params.id} ID.`, 401)
    )
  }

  res.status(200).json({
    success: true,
    user,
  })
})

// Update User ----> (Admin)
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  if (!user) {
    return next(new ErrorHandler("User does not exist", 400))
  }

  res.status(200).json({
    success: true,
    message: "User Profile Updated!",
  })
})

// Delete User ----> (Admin)
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  user.remove()

  res.status(200).json({
    success: true,
    message: "User Removed Successfully!",
  })
})
