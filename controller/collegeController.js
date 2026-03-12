const College = require('../models/College')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

exports.getAllColleges = asyncHandler(async (req, res, next) => {
  console.log(req.query)

  let queryObj = { ...req.query }

  let removeFields = ['select', 'sort']
  removeFields.forEach(val => delete queryObj[val])

  let queryStr = JSON.stringify(queryObj)

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

  queryObj = JSON.parse(queryStr)
  console.log(queryObj)

  let query = College.find(queryObj)

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  }


  const colleges = await query
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