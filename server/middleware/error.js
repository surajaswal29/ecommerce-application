const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // wrong mongodb error
  if (err.name === "CastError") {
    const message = `Mongo DB Error: Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  console.log(`Error Middleware: ${err}`)
  

  res.status(err.statusCode).json({
    success: false,
    error: err.message || "Something went wrong",
  });
};
