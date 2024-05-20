import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import dayjs from 'dayjs';
import { UploadImage } from '../middleware';
import { Constant, ErrorHandler, Mail, AsyncHandler, Types } from '../utils';

// Register a user
export const registerUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, uname } = req.body;

    if (!email || !password || !uname) {
      return next(new ErrorHandler('Please Enter All Fields', 400));
    }

    const checkUserExist = await User.findOne({ email });
    console.log(checkUserExist);
    if (checkUserExist) {
      return next(new ErrorHandler('User already exists', 400));
    }

    const otp = await Constant.GENERATE_OTP();

    req.body.name = uname;
    req.body.emailVerificationOTP = otp;
    req.body.emailVerificationExpire = Date.now() + 30 * 1000;

    const user = await User.create(req.body);

    if (user) {
      Mail.email_verification_mail({
        to: email,
        html: { userName: uname, otp },
      });

      return res.status(200).json({
        success: true,
        message:
          'Verification email sent! Please check your inbox to complete signup',
      });
    }
  }
);

// Verify email for user registration
export const verifyEmail = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body;

    if (typeof otp !== 'number') {
      return next(
        new ErrorHandler('Invalid OTP: OTP must be of Number type', 400)
      );
    }
    if (!email || !otp) {
      return next(new ErrorHandler('Please Enter All Fields', 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    if (user.emailVerificationOTP !== otp) {
      return next(new ErrorHandler('Invalid OTP', 400));
    }

    if (
      user.emailVerificationExpire &&
      user.emailVerificationExpire < new Date()
    ) {
      return next(new ErrorHandler('OTP Expired', 400));
    }

    user.emailVerified = true;
    user.active = true;
    user.emailVerificationOTP = undefined;
    user.emailVerificationExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Email verified and user registered successfully!',
    });
  }
);

// Resend OTP
export const resendOTP = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandler('Please Enter Email', 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    if (
      user.emailVerificationExpire &&
      user.emailVerificationExpire > new Date()
    ) {
      return next(
        new ErrorHandler('OTP already sent. please wait for 2 Minutes', 400)
      );
    }

    const otp: number = await Constant.GENERATE_OTP();

    user.emailVerificationOTP = otp;
    user.emailVerificationExpire = new Date(Date.now() + 30 * 1000);

    await user.save();

    Mail.email_verification_mail({
      to: email,
      html: { userName: user.name, otp },
    });

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
    });
  }
);

// Upload user image
export const uploadImage = AsyncHandler(async (req: Request, res: Response) => {
  const uploadFile = await UploadImage.uploadToCloudinary(req);

  return res.status(200).json(uploadFile);
});

// Login User
export const loginUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler('please Enter Email & Password', 400));
    }

    const user = await User.findOne({
      email,
      emailVerified: true,
      active: true,
    }).select('+password');

    if (!user) {
      return next(new ErrorHandler('User does not exist', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler('Wrong Password or Email', 401));
    }

    const jwtToken = user.getJWTToken();

    const options = {
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite:
        process.env.NODE_ENV === 'development' ? true : ('none' as const),
      secure: process.env.NODE_ENV !== 'development',
    };

    return res.status(200).cookie('shopio_token', jwtToken, options).json({
      success: true,
      message: 'Login Successfully',
      token: jwtToken,
    });
  }
);

// Logout User
export const logoutUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('shopio_token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      status: true,
      message: 'Logged Out',
    });
  }
);

// Forgot password
export const forgotPassword = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    // Get ResetPassword Token
    const resetToken = await Constant.resetPasswordToken();
    const tokenHash = await Constant.generateHash(resetToken);

    // Password Reset URL
    const resetPasswordUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/password/reset/${resetToken}`;

    const sendMail = Mail.password_reset_mail({
      to: user.email,
      html: { userName: user.name, resetLink: resetPasswordUrl },
    });

    if (await sendMail) {
      const updateToken = await User.findByIdAndUpdate(user._id, {
        resetPasswordToken: tokenHash,
        resetPasswordExpire: Date.now() + 10 * 60 * 1000,
      });

      if (updateToken) {
        res.status(200).json({
          success: true,
          resetPasswordUrl,
          message: 'Reset Password Link sent to your email',
        });
      }
    } else {
      return next(new ErrorHandler('Email not sent', 400));
    }
  }
);

// Reset Password
export const resetPassword = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, confirmPassword } = req.body;
    // creating token hash
    const resetTokenHash = await Constant.generateHash(req.params.token);

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorHandler('Invalid Token or expired', 400));
    }

    if (password !== confirmPassword) {
      return next(new ErrorHandler('Password does not match', 400));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res
      .status(200)
      .cookie('shopio_token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({ success: true, message: 'Password Updated Successfully' });
  }
);

// Get User Details
export const getUserDetails = AsyncHandler(
  async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({ success: true, user });
  }
);

// Change Password
export const updatePassword = AsyncHandler(
  async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler('Old password is incorrect', 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler('password does not match', 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    res.cookie('shopio_token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      status: true,
      message: 'Password updated successfully!',
    });
  }
);

// Update Profile
export const updateProfile = AsyncHandler(
  async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
    const updateAllowed = ['name', 'phone', 'dob', 'gender', 'bio', 'avatar'];

    const isValidKey = Constant.checkValidKey(updateAllowed, req.body);

    console.log(isValidKey);

    if (!isValidKey.isValid) {
      return next(
        new ErrorHandler(
          `Invalid key: ${isValidKey.key}. Valid are: ${updateAllowed.join(
            ', '
          )}`,
          400
        )
      );
    }

    if (!dayjs(req.body.dob, 'YYYY-MM-DD', true).isValid()) {
      return next(
        new ErrorHandler(
          'Invalid date of birth format. Allowed format is YYYY-MM-DD',
          400
        )
      );
    }

    if (req.body.dob) {
      req.body.dob = dayjs(req.body.dob).format('YYYY-MM-DD');
    }

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!user) {
      return next(new ErrorHandler('cannot update user', 400));
    }

    res
      .status(200)
      .json({ success: true, message: 'Profile Updated Successfully' });
  }
);

// Update or add user address
export const updateUserAddress = AsyncHandler(
  async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
    const keyAllowed = [
      'label',
      'city',
      'state',
      'country',
      'zipCode',
      'address',
      'priority',
    ];

    const isValidKey = Constant.checkValidKey(keyAllowed, req.body);

    if (!isValidKey.isValid) {
      return next(
        new ErrorHandler(
          `Invalid key: ${isValidKey.key}. Valid keys are: ${keyAllowed.join(
            ', '
          )}`,
          400
        )
      );
    }

    if (!req.query.addressId) {
      const missingKey = keyAllowed.filter(
        (key) => key !== 'label' && key !== 'priority'
      );
      if (
        !req.body.city ||
        !req.body.state ||
        !req.body.country ||
        !req.body.zipCode ||
        !req.body.address
      ) {
        return next(
          new ErrorHandler(
            `Missing key: Required keys are: ${missingKey.join(', ')}`,
            400
          )
        );
      }
    }

    if (req.query.addressId) {
      const updateData: { [key: string]: any } = {};

      for (const key in req.body) {
        if (keyAllowed.includes(key)) {
          updateData[`address.$[elem].${key}`] = req.body[key];
        }
      }

      console.log(updateData);

      const updateExistAddress = await User.findOneAndUpdate(
        { _id: req.user._id, 'address._id': req.query.addressId },
        { $set: updateData },
        {
          arrayFilters: [{ 'elem._id': req.query.addressId }],
          new: true,
          useFindAndModify: false,
          runValidators: true,
        }
      );

      if (updateExistAddress) {
        return res.status(200).json({
          success: true,
          message: 'Address updated successfully',
          data: updateExistAddress,
        });
      }
    }

    const updateAddress = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { address: req.body } },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    if (!updateAddress) {
      return next(new ErrorHandler('Error', 400));
    }
    return res.status(200).json({
      success: true,
      message: 'New address added successfully',
      data: updateAddress,
    });
  }
);

export const deleteUserAddress = AsyncHandler(
  async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
    const deleteAddress = await User.findOneAndUpdate(
      { _id: req.user._id, 'address._id': req.params.addressId },
      { $pull: { address: { _id: req.params.addressId } } },
      { new: true }
    );

    if (!deleteAddress) {
      return next(new ErrorHandler('Error', 400));
    }

    return res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
      data: deleteAddress,
    });
  }
);

// Get All Users (Admin)
export const getAllUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // get all users
    const users = await User.find();

    res.status(200).json({
      success: true,
      usersFound: `${users.length} users found`,
      users,
    });
  }
);

// Get Single User Details (Admin)
export const getSingleUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with ${req.params.id} ID.`, 401)
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  }
);

// Update User (Admin)
export const updateUserProfile = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!user) {
      return next(new ErrorHandler('User does not exist', 400));
    }

    res.status(200).json({
      success: true,
      message: 'User Profile Updated!',
    });
  }
);

// Delete User (Admin)
export const deleteUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    user?.remove();

    res.status(200).json({
      success: true,
      message: 'User Removed Successfully!',
    });
  }
);
