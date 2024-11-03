import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';

export interface IAuthRequest extends Request {
  user?: any;
}

export interface IErrorHandler extends Error {
  statusCode?: number;
  path?: string;
}

export interface IEmailData {
  to?: string;
  html?: {
    userName?: string;
    otp?: number;
    resetLink?: string;
  };
}

interface IAddress {
  label: 'home' | 'office' | 'other';
  city: string;
  state: string;
  country: string;
  zipCode: string;
  address?: string;
  priority: 'primary' | 'secondary';
}

export interface IUserDocument extends Document {
  name: string;
  email: string;
  phone?: string | null;
  dob?: Date | null;
  gender?: 'male' | 'female' | 'other' | null;
  bio?: string;
  interests?: string[];
  address: IAddress[];
  password: string;
  avatar?: string | null;
  role: string;
  emailVerified: boolean;
  active: boolean;
  emailVerificationOTP?: number;
  emailVerificationExpire?: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
  getJWTToken(): string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

export type AsyncCallback = (req: Request, res: Response, next: NextFunction) => Promise<any>;
