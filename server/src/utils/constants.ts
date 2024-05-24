import crypto from 'crypto';

export const EMAIL_VERIFICATION_SUBJECT =
  'Your OTP for Email Verification - Shopio';

export const PASSWORD_RESET_SUBJECT = 'Password reset verification - Shopio';

export const OTP_EMAIL_TEMPLATE = (data: any) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification OTP</title>
    <style>
        /* CSS for responsive layout */
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                margin: 0 auto !important;
            }
            .content {
                padding: 20px !important;
            }
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; background-image: url${
    data?.bgImage || 'https://via.placeholder.com/600x400'
  }; background-size: cover; background-repeat: no-repeat; background-position: center;">

<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: rgba(255, 255, 255, 0.8);">
    <tr>
        <td class="container">
            <table align="center" cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse: collapse;">
                <tr>
                    <td align="center" bgcolor="#ffffff" style="padding: 40px 0;">
                        <!-- Replace the src attribute with the URL of your logo -->
                         <img src="https://res.cloudinary.com/dzfc0ty7q/image/upload/v1714307253/ecommerce/Untitled_design-removebg-preview_tlqqqy.png" alt="Shopio Logo" width="150">
                        <h1 style="margin-top: 20px;">Shopio Email Verification OTP</h1>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" class="content" style="padding: 40px;">
                        <p style="font-size: 16px;">Hello ${data.userName},</p>
                        <p style="font-size: 16px;">Your One-Time Password (OTP) for email verification is:</p>
                        <p style="font-size: 24px; font-weight: bold; text-align: center;">${
                          data?.otp
                        }</p>
                        <p style="font-size: 16px;">Please use this OTP to verify your email address. It will expire in 10 minutes.</p>
                        <p style="font-size: 16px;">If you did not request this OTP or have any concerns, please ignore this email.</p>
                        <p style="font-size: 16px;">Thank you,</p>
                        <p style="font-size: 16px;">The Shopio Team</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>
</html>
`;

export const PASSWORD_RESET_EMAIL_TEMPLATE = (data: any) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        /* CSS for responsive layout */
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                margin: 0 auto !important;
            }
            .content {
                padding: 20px !important;
            }
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; background-image: url${
    data?.bgImage || 'https://via.placeholder.com/600x400'
  }; background-size: cover; background-repeat: no-repeat; background-position: center;">

<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: rgba(255, 255, 255, 0.8);">
    <tr>
        <td class="container">
            <table align="center" cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse: collapse;">
                <tr>
                    <td align="center" bgcolor="#ffffff" style="padding: 40px 0;">
                        <!-- Replace the src attribute with the URL of your logo -->
                        <img src="https://res.cloudinary.com/dzfc0ty7q/image/upload/v1714307253/ecommerce/Untitled_design-removebg-preview_tlqqqy.png" alt="Shopio Logo" width="150">
                        <h1 style="margin-top: 20px;">Password Reset</h1>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" class="content" style="padding: 40px;">
                        <p style="font-size: 16px;">Hello ${data.userName},</p>
                        <p style="font-size: 16px;">We received a request to reset your password. Please click the link below to proceed:</p>
                        <p style="text-align: center;"><a href="${
                          data.resetLink
                        }" style="font-size: 16px; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
                        <p style="font-size: 16px;">If you did not request a password reset or have any concerns, please ignore this email.</p>
                        <p style="font-size: 16px;">Thank you,</p>
                        <p style="font-size: 16px;">The Shopio Team</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>
</html>
`;

// generate otp
export const GENERATE_OTP = async (): Promise<number> => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return parseInt(otp.toString());
};

export const USER_DEFAULT_AVATAR = [
  {
    gender: 'male',
    avatar:
      'https://res.cloudinary.com/dzfc0ty7q/image/upload/v1714272765/avatars/Web3_Avatar-19_cinvzc.svg',
  },
  {
    gender: 'female',
    avatar:
      'https://res.cloudinary.com/dzfc0ty7q/image/upload/v1714272765/avatars/Web3_Avatar-17_mub2x1.svg',
  },
  {
    gender: 'other',
    avatar:
      'https://res.cloudinary.com/dzfc0ty7q/image/upload/v1714272548/avatars/Web3_Avatar-2_zpkkix.svg',
  },
];

export const resetPasswordToken = async () =>
  crypto.randomBytes(16).toString('hex');

export const generateHash = async (data: any) =>
  crypto.createHash('sha256').update(data).digest('hex');

export const checkValidKey = (keyData: any, bodyData: any) => {
  const bodyDataKeys = Object.keys(bodyData);

  for (let i = 0; i < bodyDataKeys.length; i++) {
    if (!keyData.includes(bodyDataKeys[i])) {
      return {
        isValid: false,
        key: bodyDataKeys[i],
      };
    }
  }

  return {
    isValid: true,
    key: null,
  };
};
