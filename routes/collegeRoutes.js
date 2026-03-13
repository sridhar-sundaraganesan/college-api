const express = require('express')
const { getAllColleges, getCollegeById, createCollege, updateCollege, deleteCollege } = require('../controller/collegeController')

const courseRoutes = require('./courseRoutes')

const router = express.Router()

router.use('/:collegeId/courses', courseRoutes)

router.route('/')
  .get(getAllColleges)
  .post(createCollege)

router.route('/:id')
  .get(getCollegeById)
  .put(updateCollege)
  .delete(deleteCollege)

module.exports = router