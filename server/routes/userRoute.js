const express = require("express")
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserProfile,
  deleteUser,
  uploadImage,
} = require("../controllers/userController")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")
const { uploadSingleFile } = require("../utils/uploadImage")

const router = express.Router()

// Register User Router
router.route("/register").post(registerUser)
router.route("/upload_file").post(uploadSingleFile, uploadImage)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logoutUser)
router.route("/me").get(isAuthenticatedUser, getUserDetails)

// Change Password Route
router.route("/password/update").put(isAuthenticatedUser, updatePassword)

// User Profile Update Route
router.route("/me/update").put(isAuthenticatedUser, updateProfile)

// Get All Users Route
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser)

// Get Single User Route
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)

// Update User Profile
router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserProfile)

// Delete User Profile
router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)
module.exports = router
