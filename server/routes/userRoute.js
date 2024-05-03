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
  verifyEmail,
  resendOTP,
  updateUserAddress,
  deleteUserAddress,
} = require("../controllers/userController")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")
const { uploadSingleFile } = require("../utils/uploadImage")

const router = express.Router()

// Register User Router
router.route("/register").post(registerUser)

router.route("/verify_email").post(verifyEmail)

router.route("/resend_verification_otp").post(resendOTP)

router.route("/upload_file").post(uploadSingleFile, uploadImage)
router.route("/login").post(loginUser)
router.route("/forgot_password").post(forgotPassword)
router.route("/password_reset/:token").post(resetPassword)
router.route("/logout").get(logoutUser)
router.route("/user_info").get(isAuthenticatedUser, getUserDetails)

// Change Password Route
router.route("/password/update").put(isAuthenticatedUser, updatePassword)

// User Profile Update Route
router.route("/update_user_profile").post(isAuthenticatedUser, updateProfile)
router.route("/add_user_address").post(isAuthenticatedUser, updateUserAddress)
router
  .route("/delete_user_address/:addressId")
  .delete(isAuthenticatedUser, deleteUserAddress)

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
