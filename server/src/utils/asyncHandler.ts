import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Types } from './index';

const asyncHandler = (callback: Types.AsyncCallback): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(callback(req, res, next)).catch(next);
  };
};

export default asyncHandler;
