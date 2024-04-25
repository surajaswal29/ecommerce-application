const express = require("express")
const app = express()
// console.log(app);
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

// config
dotenv.config({ path: "backend/config/.env" })

// const origin =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3000"
//     : "https://themenhood.netlify.app"
// CORS
app.use(
  cors({
    origin: "*",
  })
)

// Express-FileUpload Package
const fileUpload = require("express-fileupload")

const errorMiddleware = require("./middleware/error")

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

// Route Imports
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")

app.use("/api/v1/product", product)
app.use("/api/v1/user", user)
app.use("/api/v1/order", order)
app.use("/api/v1/payment", payment)

app.use(express.static(path.join(__dirname, "./view")))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./view/index.html"))
})

// Middleware for Error
app.use(errorMiddleware)

module.exports = app
