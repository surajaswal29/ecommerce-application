const mongoose = require("mongoose");

const connectDB = () => {
  console.log(process.env.DB_URL)
  mongoose
    .connect(process.env.DB_URL, {
      dbName: "ecommerce",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `Mongo DB Connected Succesfully with=> ${data.connection.host}`
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
