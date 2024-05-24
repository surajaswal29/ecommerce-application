import { Request, Response, NextFunction } from 'express';
import { Types, ErrorHandler } from '../utils';

const errorMiddleware = (
  err: Types.IErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';

  // wrong mongodb error
  if (err.name === 'CastError') {
    const message = `Mongo DB Error: Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  console.log(`Error Middleware: ${err}`);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Something went wrong',
  });
};

export default errorMiddleware;
