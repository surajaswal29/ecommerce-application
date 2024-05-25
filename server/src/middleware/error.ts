import { Request, Response, NextFunction } from 'express';
import { Types, ErrorHandler } from '../utils';
import { Error } from 'mongoose';

const errorMiddleware = (err: Types.IErrorHandler, req: Request, res: Response, next: NextFunction) => {
  /*
  // Handle Mongoose Validation Error
  if (err instanceof Error.ValidationError) {
    const errorMessage = Object.values(err.errors).map((error) => {
      if (error instanceof Error.CastError) {
        return `Invalid value for ${error?.path}: ${error?.value}. Please provide a valid ${error?.kind}.`;
      }
      return [err.message];
    })[0];

    return res.status(400).json({
      success: false,
      error: errorMessage,
      e: err,
    });
  }

  // Handle Mongoose Cast Error (e.g., invalid ObjectId)
  if (err instanceof Error.CastError) {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID Format',
      message: `Invalid ${err.path}: ${err.value}. Please provide a valid ObjectId.`,
    });
  }
  */
  return res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Something went wrong',
  });
};

export default errorMiddleware;
