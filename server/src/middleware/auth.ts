import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorHandler';
import JWT from 'jsonwebtoken';
import { User } from '../models';
import { AsyncHandler, Types } from '../utils';

// Middleware to check if the user is authenticated
export const isAuthenticatedUser = AsyncHandler(async (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
  // Extract token from cookies
  const { shopio_token } = req.cookies;

  // If token is not present, return error
  if (!shopio_token) {
    return next(new ErrorHandler('Please login to access this resource.', 401));
  }

  // Verify JWT token
  const decodeData: any = JWT.verify(shopio_token, process.env.JWT_SECRET!);

  // Find user by decoded user id
  const user = await User.findById(decodeData.id);

  // If user not found, return error
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // Set user data to request object
  req.user = user;

  // Proceed to next middleware
  next();
});

// Middleware to authorize user roles
export const authorizeRoles = (...roles: string[]) => {
  return (req: Types.IAuthRequest, res: Response, next: NextFunction) => {
    // If user role is not included in provided roles, return error
    if (!roles.includes(req?.user?.role)) {
      return next(new ErrorHandler(`Role: ${req?.user?.role} is not allowed to access this resource.`, 403));
    }

    // Proceed to next middleware
    next();
  };
};
