import express, { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers';
import { UserAuth, UploadImage } from '../middleware';

const router: Router = express.Router();

// Define types for request handlers if not already defined
type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;

// Register User Router
router.route('/register').post(UserController.registerUser as RequestHandler);

router.route('/verify_email').post(UserController.verifyEmail as RequestHandler);

router.route('/resend_verification_otp').post(UserController.resendOTP as RequestHandler);

router.route('/upload_file').post(UploadImage.uploadSingleFile, UserController.uploadImage as RequestHandler);
router.route('/login').post(UserController.loginUser as RequestHandler);
router.route('/forgot_password').post(UserController.forgotPassword as RequestHandler);
router.route('/password_reset/:token').post(UserController.resetPassword as RequestHandler);
router.route('/logout').get(UserController.logoutUser as RequestHandler);
router.route('/user_info').get(UserAuth.isAuthenticatedUser, UserController.getUserDetails as RequestHandler);

// Change Password Route
router.route('/password/update').put(UserAuth.isAuthenticatedUser, UserController.updatePassword as RequestHandler);

// User Profile Update Route
router.route('/update_user_profile').post(UserAuth.isAuthenticatedUser, UserController.updateProfile as RequestHandler);
router.route('/add_user_address').post(UserController.addUserAddress as RequestHandler);
router
  .route('/delete_user_address/:addressId')
  .delete(UserAuth.isAuthenticatedUser, UserController.deleteUserAddress as RequestHandler);

// Get All Users Route
router
  .route('/admin/users')
  .get(UserAuth.isAuthenticatedUser, UserAuth.authorizeRoles('admin'), UserController.getAllUser as RequestHandler);

// Get Single User Route
router
  .route('/admin/user/:id')
  .get(UserAuth.isAuthenticatedUser, UserAuth.authorizeRoles('admin'), UserController.getSingleUser as RequestHandler);

// Update User Profile
router
  .route('/admin/user/:id')
  .put(
    UserAuth.isAuthenticatedUser,
    UserAuth.authorizeRoles('admin'),
    UserController.updateUserProfile as RequestHandler
  );

// Delete User Profile
router
  .route('/admin/user/:id')
  .delete(UserAuth.isAuthenticatedUser, UserAuth.authorizeRoles('admin'), UserController.deleteUser as RequestHandler);

export default router;
