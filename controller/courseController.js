const Course = require('../models/Course')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../middleware/error')


//@Desc getAllCourses GET
//@Desc getAllCourses associated with bootcampId
//@Route getcourse
//@route /:collegeid/courses

exports.getAllCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.collegeId) {
    query = Course.find({ college: req.params.collegeId })
  } else {
    query = Course.find().populate({
      path: 'college',
      select: 'name averageFees founderName'
    })
  }
  const courses = await query
  res.status(200).json({ success: true, count: courses.length, data: courses })
})

