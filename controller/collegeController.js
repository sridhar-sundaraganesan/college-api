const College = require('../models/College')
const asyncHandler = require('../middleware/asyncHandler')

exports.getAllColleges = asyncHandler(async (req, res, next) => {
  const colleges = await College.find()
  res.status(200).json({ success: true, count: colleges.length, data: colleges })
})

exports.createCollege = asyncHandler(async (req, res, next) => {
  const college = await College.create(req.body)
  res.status(200).json({ success: true, data: college })
})


exports.getCollegeById = asyncHandler(async (req, res, next) => {
  const colleges = await College.findById(req.params.id)
  res.status(200).json({ success: true, data: colleges })
})

exports.updateCollege = asyncHandler(async (req, res, next) => {
  const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!college) {
    res.status(404).json({ success: false, data: `No data found with id of ${req.params.id}` })
  }
  res.status(200).json({ success: true, data: college })
})


exports.deleteCollege = asyncHandler(async (req, res, next) => {
  const college = await College.findByIdAndDelete(req.params.id)
  res.status(200).json({ success: true, data: 'Data deleted' })
})