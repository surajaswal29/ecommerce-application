const mongoose = require("mongoose")
const morgan = require("morgan")

const connectDB = () => {
  if (process.env.NODE_ENV === "production") {
    mongoose.set("debug", false)
  }
  mongoose.set("strictQuery", false)

  mongoose
    .connect(process.env.DB_URL, {
      dbName: "ecommerce",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("Connected with database")
    })
    .catch((error) => {
      console.log(error)
    })
}

module.exports = connectDB
