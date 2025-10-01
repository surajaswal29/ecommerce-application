const express = require("express")
const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require("../utils/uploadImage")
const {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
  getUploadStats,
} = require("../controllers/uploadController")

const router = express.Router()

// Upload single image
router.post("/single", uploadSingleFile, uploadSingleImage)

// Upload multiple images
router.post("/multiple", uploadMultipleFiles, uploadMultipleImages)

// Delete image
router.delete("/:publicId", deleteImage)

// Get upload statistics
router.get("/stats", getUploadStats)

module.exports = router
