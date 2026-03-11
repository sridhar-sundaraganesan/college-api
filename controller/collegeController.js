const College = require('../models/College')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

exports.getAllColleges = asyncHandler(async (req, res, next) => {
  const colleges = await College.find()
  res.status(200).json({ success: true, count: colleges.length, data: colleges })
})

exports.createCollege = asyncHandler(async (req, res, next) => {
  const college = await College.create(req.body)
  res.status(200).json({ success: true, data: college })
})


exports.getCollegeById = asyncHandler(async (req, res, next) => {
  const college = await College.findById(req.params.id)
  if (!college) {
    return next(new ErrorResponse(`College not found with the id of ${req.params.id}`, 404))
  }
  res.status(200).json({ success: true, data: college })
})

exports.updateCollege = asyncHandler(async (req, res, next) => {
  const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!college) {
    return next(new ErrorResponse(`College not found with the id of ${req.params.id}`, 404))
  }
  res.status(200).json({ success: true, data: college })
})


exports.deleteCollege = asyncHandler(async (req, res, next) => {
  const college = await College.findByIdAndDelete(req.params.id)

  if (!college) {
    return next(new ErrorResponse(`College not found with the id of ${req.params.id}`, 404))
  }

  res.status(200).json({ success: true, data: 'Data deleted' })
})