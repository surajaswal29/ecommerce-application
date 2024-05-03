const nodemailer = require("nodemailer")
const {
  EMAIL_VERIFICATION_SUBJECT,
  OTP_EMAIL_TEMPLATE,
  GENERATE_OTP,
  PASSWORD_RESET_SUBJECT,
  PASSWORD_RESET_EMAIL_TEMPLATE,
} = require("./constants")

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    host: process.env.MAIL_HOST || "smtp.gmail.com", // Provide default values if environment variables are not set
    port: parseInt(process.env.MAIL_PORT || 465), // Ensure port is parsed as an integer
    secure: true,
    auth: {
      user: process.env.GOOGLE_EMAIL_ID,
      pass: process.env.APP_PASSWORD,
    },
  })
}

exports.email_verification_mail = async (data) => {
  try {
    console.log({
      user: process.env.GOOGLE_EMAIL_ID,
      pass: process.env.APP_PASSWORD,
    })
    const transporter = createTransporter() // Create transporter instance
    console.log(transporter)
    await transporter.verify() // Verify transporter
    console.log("Ready for sending email")
    console.log(data)

    const info = await transporter.sendMail({
      from: `"Shopio" <${process.env.GOOGLE_EMAIL_ID || ""}>`,
      to: data?.to || "",
      subject: EMAIL_VERIFICATION_SUBJECT,
      html: OTP_EMAIL_TEMPLATE({
        bgImage: null,
        appLogo: null,
        userName: data?.html?.userName,
        otp: data?.html?.otp,
      }),
    })

    // Send email
    console.log("Email sent:", info)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

exports.password_reset_mail = async (data) => {
  try {
    const transporter = createTransporter() // Create transporter instance
    await transporter.verify() // Verify transporter

    const info = await transporter.sendMail({
      from: `"Shopio" <${process.env.GOOGLE_EMAIL_ID || ""}>`,
      to: data?.to || "",
      subject: PASSWORD_RESET_SUBJECT,
      html: PASSWORD_RESET_EMAIL_TEMPLATE({
        bgImage: null,
        userName: data?.html?.userName,
        resetLink: data?.html?.resetLink,
      }),
    })

    // Send email
    console.log("Email sent:", info)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}
