const College = require('../models/College')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

exports.getAllColleges = asyncHandler(async (req, res, next) => {
  console.log(req.query)

  let queryObj = { ...req.query }

  let removeFields = ['select', 'sort', 'page', 'limit']
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


  //Pagination
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 1
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await College.countDocuments()

  query = query.skip(startIndex).limit(limit)

  let pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit
    }
  }

  const colleges = await query
  res.status(200).json({ success: true, count: colleges.length, pagination, data: colleges })
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