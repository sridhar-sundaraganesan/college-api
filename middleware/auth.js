const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('./asyncHandler')
const jwt = require('jsonwebtoken')

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  // else if(req.cookies.token){
  //   token=req.cookies.token
  // }

  //Check if token exists
  if (!token) {
    return next(new ErrorResponse(`Not authorized to access this route`, 401))
  }

  //Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    req.user = await User.findById(decoded.id)
    next()
  } catch (err) {
    return next(new ErrorResponse(`Not authorized to access this route`, 401))
  }
})


//Grant access to spicific role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this resource`, 401))
    }
    next();
  }
}