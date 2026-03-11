const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
  let error;
  error = { ...err }
  error.message = err.message

  console.log(err.name)

  //CastError mismatch in Object id - Mongoose Error
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  //Duplicate Keys Error
  if (err.code === 11000) {
    const message = `Duplicate key value entered`
    error = new ErrorResponse(message, 400)
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message, 400)
  }


  res.status(error.statusCode || 500).json({ success: false, data: error.message || `Internal Server error` })
}

module.exports = errorHandler