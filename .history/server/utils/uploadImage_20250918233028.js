const multer = require("multer")
const cloudinary = require("cloudinary").v2

// Configure multer for memory storage
const storage = multer.memoryStorage()

// File filter function
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith("image/")) {
    // Check for specific image types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Only JPEG, PNG, GIF, and WebP images are allowed"), false)
    }
  } else {
    cb(new Error("Only image files are allowed"), false)
  }
}

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit (increased from 2MB)
    files: 1, // Only allow 1 file at a time
  },
})

// Single file upload middleware
const single_upload = upload.single("file")

// Multiple files upload middleware
const multiple_upload = upload.array("files", 5) // Max 5 files

// Middleware to handle single file upload
exports.uploadSingleFile = (req, res, next) => {
  single_upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error("Multer Error:", err)
      
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File size exceeds the limit of 5MB",
          error: "FILE_TOO_LARGE"
        })
      } else if (err.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({
          success: false,
          message: "Too many files uploaded",
          error: "TOO_MANY_FILES"
        })
      } else {
        return res.status(400).json({
          success: false,
          message: err.message,
          error: "UPLOAD_ERROR"
        })
      }
    } else if (err) {
      console.error("Upload Error:", err)
      return res.status(400).json({
        success: false,
        message: err.message,
        error: "INVALID_FILE"
      })
    } else if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
        error: "NO_FILE"
      })
    } else {
      return next()
    }
  })
}

// Middleware to handle multiple files upload
exports.uploadMultipleFiles = (req, res, next) => {
  multiple_upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error("Multer Error:", err)
      
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "One or more files exceed the limit of 5MB",
          error: "FILE_TOO_LARGE"
        })
      } else if (err.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({
          success: false,
          message: "Too many files uploaded (maximum 5 files allowed)",
          error: "TOO_MANY_FILES"
        })
      } else {
        return res.status(400).json({
          success: false,
          message: err.message,
          error: "UPLOAD_ERROR"
        })
      }
    } else if (err) {
      console.error("Upload Error:", err)
      return res.status(400).json({
        success: false,
        message: err.message,
        error: "INVALID_FILE"
      })
    } else if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
        error: "NO_FILES"
      })
    } else {
      return next()
    }
  })
}

exports.uploadToCloudinary = async (req) => {
  try {
    const file = req.file
    const uniqueFilename = new Date().toISOString() + "_" + file.originalname

    // converting file to base64
    let base64 = file.buffer.toString("base64")
    const dataUri = `data:${file.mimetype};base64,${base64}`

    // uploadting to cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "ecommerce",
      use_filename: true,
      public_id: uniqueFilename,
      overwrite: false,
      resource_type: "auto",
    })
    return {
      success: true,
      msg: "Image uploaded successfully",
      url: result.secure_url,
    }
  } catch (error) {
    console.log(error)
    console.log("Error in uploading image to cloudinary")
    return {
      success: false,
      msg: error.message,
    }
  }
}
