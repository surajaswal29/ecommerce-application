const ErrorHandler = require("../utils/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
} = require("../utils/uploadImage")

// Upload single image
exports.uploadSingleImage = catchAsyncError(async (req, res, next) => {
  const { folder = "ecommerce" } = req.body

  const result = await uploadToCloudinary(req, folder)

  if (!result.success) {
    return next(new ErrorHandler(result.message, 400))
  }

  res.status(200).json({
    success: true,
    message: result.message,
    data: result.data,
  })
})

// Upload multiple images
exports.uploadMultipleImages = catchAsyncError(async (req, res, next) => {
  const { folder = "ecommerce" } = req.body

  const result = await uploadMultipleToCloudinary(req, folder)

  if (!result.success) {
    return next(new ErrorHandler(result.message, 400))
  }

  res.status(200).json({
    success: true,
    message: result.message,
    data: result.data,
  })
})

// Delete image
exports.deleteImage = catchAsyncError(async (req, res, next) => {
  const { publicId } = req.params

  if (!publicId) {
    return next(new ErrorHandler("Public ID is required", 400))
  }

  const result = await deleteFromCloudinary(publicId)

  if (!result.success) {
    return next(new ErrorHandler(result.message, 400))
  }

  res.status(200).json({
    success: true,
    message: result.message,
    data: result.data,
  })
})

// Get upload statistics (optional)
exports.getUploadStats = catchAsyncError(async (req, res, next) => {
  // This could be expanded to track upload statistics
  res.status(200).json({
    success: true,
    message: "Upload statistics retrieved successfully",
    data: {
      maxFileSize: "5MB",
      allowedTypes: ["JPEG", "PNG", "GIF", "WebP"],
      maxFiles: 5,
    },
  })
})
