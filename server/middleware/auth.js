const ErrorHandler = require("../utils/errorhandler")
const catchAsyncError = require("./catchAsyncError")
const JWT = require("jsonwebtoken")
const User = require("../models/userModel")

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { shopio_token } = req.cookies

  if (!shopio_token) {
    return next(new ErrorHandler("Please login to access this resource.", 401))
  }

  const decodeData = JWT.verify(shopio_token, process.env.JWT_SECRET)

  console.log(decodeData)
  const user = await User.findById(decodeData.id)

  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }

  req.user = user
  //console.log(req.user);
  next()
})

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user);
    if (!roles.includes(req?.user?.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req?.user?.role} is not allowed to access this resource.`,
          403
        )
      )
    }

    next()
  }
}
