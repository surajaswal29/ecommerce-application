// =============================================================================
// SERVER CONFIGURATION
// =============================================================================

const dotenv = require("dotenv")

// Load environment variables
dotenv.config({
  path: "./server/.env",
})

// Server configuration
const config = {
  // Server settings
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || "development",

  // Database configuration
  database: {
    uri: process.env.DB_URI || "mongodb://localhost:27017/ecommerce",
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: process.env.JWT_EXPIRE || "7d",
    cookieExpires: process.env.COOKIE_EXPIRE || 7,
  },

  // Cloudinary configuration
  cloudinary: {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  },

  // Email configuration
  email: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    email: process.env.SMTP_EMAIL,
    password: process.env.SMTP_PASSWORD,
  },

  // CORS configuration
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL || "http://localhost:3000"
        : "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
  },

  // File upload limits
  upload: {
    maxFileSize: "10mb",
    maxFiles: 5,
    allowedTypes: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ],
  },

  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
}

// Validation function
const validateConfig = () => {
  const required = [
    "CLOUDINARY_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "JWT_SECRET",
    "DB_URI",
  ]

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    console.warn("WARNING: Missing required environment variables:")
    missing.forEach((key) => console.warn(`   - ${key}`))
    console.warn("   Some features may not work properly.")
  }

  return missing.length === 0
}

module.exports = {
  config,
  validateConfig,
}
