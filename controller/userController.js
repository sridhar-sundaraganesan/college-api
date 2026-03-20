const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middleware/asyncHandler')


//@Desc POST Register a user with hashed password
//@Route POST api/v1/auth/register
//@access PUBLIC
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body

  const user = await User.create({
    name, email, password, role
  })

  sendJwtTokenResponse(user, 200, res)

})


//@Desc POST Login user with email and password
//@Route POST api/v1/auth/login
//@access PUBLIC

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorResponse(`Please enter email and password`, 400))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorResponse(`Invalid credentials`, 401))
  }

  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials`, 401))
  }

  sendJwtTokenResponse(user, 200, res)
})



//Sending JWT token , cookie and response
const sendJwtTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken()
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true
  }

  res.status(statusCode).cookie('token', token, options).json({ success: true, token })
}


//@Desc GET who logged in
//@Route GET /api/v1/auth/me
//@access PUBLIC
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  res.status(200).json({ success: true, data: user })
})

