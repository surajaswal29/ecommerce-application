// =============================================================================
// ECOMMERCE SERVER - MAIN ENTRY POINT
// =============================================================================

// External Dependencies
const express = require("express")
const path = require("path")
const cloudinary = require("cloudinary").v2

// Internal Modules
const connectDB = require("./config/database")
const errorHandler = require("./middleware/error")
const { config, validateConfig } = require("./config/server")
const {
  securityMiddleware,
  corsMiddleware,
  rateLimitMiddleware,
  loggingMiddleware,
  bodyParsingMiddleware,
  requestLoggingMiddleware,
  healthCheckMiddleware,
  errorLoggingMiddleware,
} = require("./config/middleware")

// =============================================================================
// CONFIGURATION VALIDATION
// =============================================================================

// Validate configuration
const isConfigValid = validateConfig()

// =============================================================================
// EXPRESS APP INITIALIZATION
// =============================================================================

const app = express()

// =============================================================================
// GLOBAL ERROR HANDLERS
// =============================================================================

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("ERROR: Uncaught Exception:", err.message)
  console.error("Stack:", err.stack)
  console.log("Shutting down server due to uncaught exception...")
  process.exit(1)
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("ERROR: Unhandled Promise Rejection:", err.message)
  console.error("Stack:", err.stack)
  console.log("Shutting down server due to unhandled promise rejection...")
  server.close(() => {
    process.exit(1)
  })
})

// =============================================================================
// MIDDLEWARE CONFIGURATION
// =============================================================================

// Security middleware
app.use(securityMiddleware())

// CORS middleware
app.use(corsMiddleware())

// Rate limiting middleware
app.use(rateLimitMiddleware())

// Request logging middleware
app.use(requestLoggingMiddleware)

// Body parsing middleware
app.use(...bodyParsingMiddleware())

// Cookie parser
app.use(require("cookie-parser")())

// Logging middleware
app.use(loggingMiddleware())

// Health check middleware
app.use(healthCheckMiddleware)

// =============================================================================
// DATABASE CONNECTION
// =============================================================================

connectDB()

// =============================================================================
// CLOUDINARY CONFIGURATION
// =============================================================================

cloudinary.config(config.cloudinary)

// Verify Cloudinary configuration
if (
  !config.cloudinary.cloudName ||
  !config.cloudinary.apiKey ||
  !config.cloudinary.apiSecret
) {
  console.warn(
    "WARNING: Cloudinary configuration incomplete. Image uploads may not work properly."
  )
}

// =============================================================================
// ROUTES CONFIGURATION
// =============================================================================

// API routes
app.use("/api/v1", require("./routes/index"))

// Health check endpoint is handled by middleware

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

// Error logging middleware
app.use(errorLoggingMiddleware)

// Global error handler (must be last)
app.use(errorHandler)

// =============================================================================
// SERVER STARTUP
// =============================================================================

const server = app.listen(config.port, () => {
  console.log("Server Information:")
  console.log(`   Port: ${config.port}`)
  console.log(`   Environment: ${config.nodeEnv}`)
  console.log(`   URL: http://localhost:${config.port}`)
  console.log(`   Health Check: http://localhost:${config.port}/health`)
  console.log(
    `   Database: ${config.database.uri ? "Configured" : "Not configured"}`
  )
  console.log(
    `   Cloudinary: ${
      config.cloudinary.cloudName ? "Configured" : "Not configured"
    }`
  )
  console.log(`   Config Status: ${isConfigValid ? "Valid" : "Incomplete"}`)
  console.log("=" * 50)
})

// Graceful shutdown handling
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...")
  server.close(() => {
    console.log("Process terminated")
    process.exit(0)
  })
})

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...")
  server.close(() => {
    console.log("Process terminated")
    process.exit(0)
  })
})
