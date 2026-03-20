const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please enter name'] },
  email: { type: String, required: [true, 'Please add a email'], unique: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] },
  role: { type: String, enum: ['user', 'publisher'] },
  password: { type: String, required: [true, 'Please enter password'], minLength: 6, select: false },
  resetPassword: { type: String },
  resetPasswordExpiresIn: { type: Date },
  createdAt: { type: Date, default: Date.now },
})

//Hash a password using bcrypt
userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//Generate a jwt token while registering and logging in
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

//Comparing enteredpassword with hashed password in DB using bcrypt.compare()
userSchema.methods.matchPassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password)
}


module.exports = mongoose.model('User', userSchema)