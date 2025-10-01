// =============================================================================
// MIDDLEWARE CONFIGURATION
// =============================================================================

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const { config } = require("./server")

// =============================================================================
// SECURITY MIDDLEWARE
// =============================================================================

const securityMiddleware = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
}

// =============================================================================
// CORS MIDDLEWARE
// =============================================================================

const corsMiddleware = () => {
  return cors(config.cors)
}

// =============================================================================
// RATE LIMITING MIDDLEWARE
// =============================================================================

const rateLimitMiddleware = () => {
  return rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: {
      success: false,
      message: "Too many requests from this IP, please try again later.",
      error: "RATE_LIMIT_EXCEEDED",
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
}

// =============================================================================
// LOGGING MIDDLEWARE
// =============================================================================

const loggingMiddleware = () => {
  if (config.nodeEnv === "development") {
    return morgan("dev")
  } else {
    return morgan("combined")
  }
}

// =============================================================================
// BODY PARSING MIDDLEWARE
// =============================================================================

const bodyParsingMiddleware = () => {
  return [
    express.json({
      limit: config.upload.maxFileSize,
      verify: (req, res, buf) => {
        req.rawBody = buf
      },
    }),
    express.urlencoded({
      extended: true,
      limit: config.upload.maxFileSize,
    }),
  ]
}

// =============================================================================
// REQUEST LOGGING MIDDLEWARE
// =============================================================================

const requestLoggingMiddleware = (req, res, next) => {
  const start = Date.now()

  res.on("finish", () => {
    const duration = Date.now() - start
    const logData = {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get("User-Agent"),
    }

    if (config.nodeEnv === "development") {
      console.log(
        `📝 ${logData.method} ${logData.url} - ${logData.status} (${logData.duration})`
      )
    }
  })

  next()
}

// =============================================================================
// HEALTH CHECK MIDDLEWARE
// =============================================================================

const healthCheckMiddleware = (req, res, next) => {
  if (req.path === "/health") {
    return res.status(200).json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version,
    })
  }
  next()
}

// =============================================================================
// ERROR LOGGING MIDDLEWARE
// =============================================================================

const errorLoggingMiddleware = (err, req, res, next) => {
  console.error("🚨 Error occurred:")
  console.error(`   Method: ${req.method}`)
  console.error(`   URL: ${req.url}`)
  console.error(`   IP: ${req.ip}`)
  console.error(`   Error: ${err.message}`)
  console.error(`   Stack: ${err.stack}`)

  next(err)
}

module.exports = {
  securityMiddleware,
  corsMiddleware,
  rateLimitMiddleware,
  loggingMiddleware,
  bodyParsingMiddleware,
  requestLoggingMiddleware,
  healthCheckMiddleware,
  errorLoggingMiddleware,
}
