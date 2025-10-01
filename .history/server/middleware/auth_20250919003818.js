const ErrorHandler = require("../utils/errorhandler")
const catchAsyncError = require("./catchAsyncError")
const JWT = require("jsonwebtoken")
const User = require("../models/userModel")

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ErrorHandler("Please login to access this resource.", 401))
  }

  const token = authHeader.substring(7) // Remove 'Bearer ' prefix

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource.", 401))
  }

  const decodeData = JWT.verify(token, process.env.JWT_SECRET)

  req.user = await User.findById(decodeData.id)
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
