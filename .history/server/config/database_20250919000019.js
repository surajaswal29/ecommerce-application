const mongoose = require("mongoose")

const connectDB = () => {
  if (process.env.NODE_ENV === "production") {
    mongoose.set("debug", false)
  }
  mongoose.set("strictQuery", false)

  mongoose
    .connect(process.env.DB_URI, {
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
