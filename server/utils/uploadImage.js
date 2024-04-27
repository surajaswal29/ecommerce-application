const multer = require("multer")
const cloudinary = require("cloudinary").v2

const storage = multer.memoryStorage()

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB file size limit
  },
})

const single_upload = upload.single("file")

exports.uploadSingleFile = (req, res, next) => {
  single_upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err)
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(500).json({
          success: false,
          msg: "File size exceeds the limit of 2MB",
        })
      } else {
        return res.status(500).json({
          success: false,
          msg: err.message,
        })
      }
    } else if (err) {
      return res.status(500).json({
        success: false,
        error: "Server error",
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
