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

// Upload single file to Cloudinary
exports.uploadToCloudinary = async (req, folder = "ecommerce") => {
  try {
    const file = req.file
    
    if (!file) {
      throw new Error("No file provided for upload")
    }

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const uniqueFilename = `${timestamp}_${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`

    // Convert file to base64
    const base64 = file.buffer.toString("base64")
    const dataUri = `data:${file.mimetype};base64,${base64}`

    // Upload to Cloudinary with optimization settings
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder,
      public_id: uniqueFilename,
      overwrite: false,
      resource_type: "auto",
      quality: "auto:good", // Auto quality optimization
      fetch_format: "auto", // Auto format optimization
      transformation: [
        { width: 1920, height: 1080, crop: "limit" }, // Limit max dimensions
        { quality: "auto:good" }
      ],
      tags: ["ecommerce", "uploaded"], // Add tags for better organization
    })

    return {
      success: true,
      message: "Image uploaded successfully",
      data: {
        public_id: result.public_id,
        secure_url: result.secure_url,
        url: result.url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        created_at: result.created_at,
        folder: result.folder
      }
    }
  } catch (error) {
    console.error("Cloudinary Upload Error:", error)
    return {
      success: false,
      message: error.message || "Failed to upload image to Cloudinary",
      error: "CLOUDINARY_UPLOAD_ERROR"
    }
  }
}

// Upload multiple files to Cloudinary
exports.uploadMultipleToCloudinary = async (req, folder = "ecommerce") => {
  try {
    const files = req.files
    
    if (!files || files.length === 0) {
      throw new Error("No files provided for upload")
    }

    const uploadPromises = files.map(async (file) => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const uniqueFilename = `${timestamp}_${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      
      const base64 = file.buffer.toString("base64")
      const dataUri = `data:${file.mimetype};base64,${base64}`

      return cloudinary.uploader.upload(dataUri, {
        folder: folder,
        public_id: uniqueFilename,
        overwrite: false,
        resource_type: "auto",
        quality: "auto:good",
        fetch_format: "auto",
        transformation: [
          { width: 1920, height: 1080, crop: "limit" },
          { quality: "auto:good" }
        ],
        tags: ["ecommerce", "uploaded", "multiple"]
      })
    })

    const results = await Promise.all(uploadPromises)
    
    return {
      success: true,
      message: `${results.length} images uploaded successfully`,
      data: results.map(result => ({
        public_id: result.public_id,
        secure_url: result.secure_url,
        url: result.url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        created_at: result.created_at,
        folder: result.folder
      }))
    }
  } catch (error) {
    console.error("Cloudinary Multiple Upload Error:", error)
    return {
      success: false,
      message: error.message || "Failed to upload images to Cloudinary",
      error: "CLOUDINARY_MULTIPLE_UPLOAD_ERROR"
    }
  }
}

// Delete image from Cloudinary
exports.deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      throw new Error("Public ID is required to delete image")
    }

    const result = await cloudinary.uploader.destroy(publicId)
    
    return {
      success: result.result === "ok",
      message: result.result === "ok" ? "Image deleted successfully" : "Failed to delete image",
      data: result
    }
  } catch (error) {
    console.error("Cloudinary Delete Error:", error)
    return {
      success: false,
      message: error.message || "Failed to delete image from Cloudinary",
      error: "CLOUDINARY_DELETE_ERROR"
    }
  }
}
