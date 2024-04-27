const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const cloudinary = require("cloudinary").v2
const Razorpay = require("razorpay")

// cutsom modules
const connectDB = require("./config/database")
const errorHandler = require("./middleware/error")
const helmet = require("helmet")

const app = express()

const PORT = process.env.PORT || 4000

// config
dotenv.config({
  path: "./server/config/.env",
})

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`closing server due to uncaught exception!`)

  process.exit(1)
})

// CORS
app.use(
  cors({
    origin: "*",
  })
)

// Database
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("combined"))
app.use(helmet())
// use routes

// cloudinary init
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// console.log(cloudinary.config())

app.use("/api/v1", require("./routes/index"))

// serve static files for view
app.use(express.static(path.join(__dirname, "./view")))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./view/index.html"))
})

app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`)
})

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`closing server due to unhandled error!`)
  server.close(() => {
    process.exit(1)
  })
})
