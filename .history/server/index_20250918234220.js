// =============================================================================
// ECOMMERCE SERVER - MAIN ENTRY POINT
// =============================================================================

// External Dependencies
const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const cloudinary = require("cloudinary").v2

// Internal Modules
const connectDB = require("./config/database")
const errorHandler = require("./middleware/error")
const helmet = require("helmet")

// =============================================================================
// CONFIGURATION
// =============================================================================

// Load environment variables
dotenv.config({
  path: "./server/config/.env",
})

// Server configuration
const PORT = process.env.PORT || 4000
const NODE_ENV = process.env.NODE_ENV || "development"

// =============================================================================
// EXPRESS APP INITIALIZATION
// =============================================================================

const app = express()

// =============================================================================
// GLOBAL ERROR HANDLERS
// =============================================================================

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception:", err.message)
  console.error("Stack:", err.stack)
  console.log("🔄 Shutting down server due to uncaught exception...")
  process.exit(1)
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("🚨 Unhandled Promise Rejection:", err.message)
  console.error("Stack:", err.stack)
  console.log("🔄 Shutting down server due to unhandled promise rejection...")
  server.close(() => {
    process.exit(1)
  })
})

// =============================================================================
// MIDDLEWARE CONFIGURATION
// =============================================================================

// Security middleware
app.use(helmet())

// CORS configuration
app.use(
  cors({
    origin: NODE_ENV === "production" 
      ? process.env.FRONTEND_URL || "http://localhost:3000"
      : "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
  })
)

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Cookie parser
app.use(cookieParser())

// Logging middleware
if (NODE_ENV === "development") {
  app.use(morgan("dev"))
} else {
  app.use(morgan("combined"))
}

// =============================================================================
// DATABASE CONNECTION
// =============================================================================

connectDB()

// =============================================================================
// CLOUDINARY CONFIGURATION
// =============================================================================

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Verify Cloudinary configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn("⚠️  Cloudinary configuration incomplete. Image uploads may not work properly.")
}

// =============================================================================
// ROUTES CONFIGURATION
// =============================================================================

// API routes
app.use("/api/v1", require("./routes/index"))

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime(),
  })
})

// =============================================================================
// STATIC FILES AND SPA ROUTING
// =============================================================================

// Serve static files from the view directory
app.use(express.static(path.join(__dirname, "./view")))

// Catch-all handler for SPA routing (must be after API routes)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./view/index.html"))
})

// =============================================================================
// ERROR HANDLING MIDDLEWARE
// =============================================================================

// Global error handler (must be last)
app.use(errorHandler)

// =============================================================================
// SERVER STARTUP
// =============================================================================

const server = app.listen(PORT, () => {
  console.log("🚀 Server Information:")
  console.log(`   📍 Port: ${PORT}`)
  console.log(`   🌍 Environment: ${NODE_ENV}`)
  console.log(`   🔗 URL: http://localhost:${PORT}`)
  console.log(`   📊 Health Check: http://localhost:${PORT}/health`)
  console.log(`   🗄️  Database: ${process.env.DB_URI ? "Connected" : "Not configured"}`)
  console.log(`   ☁️  Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME ? "Configured" : "Not configured"}`)
  console.log("=" * 50)
})

// Graceful shutdown handling
process.on("SIGTERM", () => {
  console.log("🔄 SIGTERM received. Shutting down gracefully...")
  server.close(() => {
    console.log("✅ Process terminated")
    process.exit(0)
  })
})

process.on("SIGINT", () => {
  console.log("🔄 SIGINT received. Shutting down gracefully...")
  server.close(() => {
    console.log("✅ Process terminated")
    process.exit(0)
  })
})
