import nodemailer, { Transporter } from 'nodemailer';
import { Constant, Types } from '.';

const createTransporter = (): Transporter => {
  return nodemailer.createTransport({
    service: 'Gmail',
    host: process.env.MAIL_HOST || 'smtp.gmail.com', // Provide default values if environment variables are not set
    port: parseInt(process.env.MAIL_PORT!) || 465, // Ensure port is parsed as an integer
    secure: true,
    auth: {
      user: process.env.GOOGLE_EMAIL_ID!,
      pass: process.env.APP_PASSWORD!,
    },
  });
};

export const email_verification_mail = async (data: Types.IEmailData): Promise<boolean> => {
  try {
    const transporter = createTransporter(); // Create transporter instance
    await transporter.verify(); // Verify transporter

    const info = await transporter.sendMail({
      from: `"Shopio" <${process.env.GOOGLE_EMAIL_ID || ''}>`,
      to: data?.to || '',
      subject: Constant.EMAIL_VERIFICATION_SUBJECT,
      html: Constant.OTP_EMAIL_TEMPLATE({
        bgImage: null,
        appLogo: null,
        userName: data?.html?.userName,
        otp: data?.html?.otp,
      }),
    });

    // Send email
    console.log('Email sent:', info);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const password_reset_mail = async (data: Types.IEmailData): Promise<boolean> => {
  try {
    const transporter = createTransporter(); // Create transporter instance
    await transporter.verify(); // Verify transporter

    const info = await transporter.sendMail({
      from: `"Shopio" <${process.env.GOOGLE_EMAIL_ID || ''}>`,
      to: data?.to || '',
      subject: Constant.PASSWORD_RESET_SUBJECT,
      html: Constant.PASSWORD_RESET_EMAIL_TEMPLATE({
        bgImage: null,
        userName: data?.html?.userName,
        resetLink: data?.html?.resetLink,
      }),
    });

    // Send email
    console.log('Email sent:', info);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
