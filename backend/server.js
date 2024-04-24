const app = require("./app")
const dotenv = require("dotenv")
const connectDB = require("./config/database")
const cloudinary = require("cloudinary")

const PORT = process.env.PORT || 4000

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`closing server due to uncaught exception!`)

  process.exit(1)
})

// config
dotenv.config({ path: "backend/config/.env" })

// Database
connectDB()

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`closing server due to unhandled error!`)
  server.close(() => {
    process.exit(1)
  })
})
