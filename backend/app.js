const express = require("express");
const app = express();
// console.log(app);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

// CORS
app.use(cors({
    origin:"https://themenhood.netlify.app",
    credentials:true
}));

// config
dotenv.config({ path: "backend/config/config.env" });

// Express-FileUpload Package
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require('./routes/paymentRoute');

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middleware for Error
app.use(errorMiddleware);

module.exports = app;
