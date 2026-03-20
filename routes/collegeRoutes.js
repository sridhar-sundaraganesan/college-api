const express = require('express')
const { getAllColleges, getCollegeById, createCollege, updateCollege, deleteCollege } = require('../controller/collegeController')

const { protect, authorize } = require('../middleware/auth')


const courseRoutes = require('./courseRoutes')

const router = express.Router()

router.use('/:collegeId/courses', courseRoutes)

router.route('/')
  .get(getAllColleges)
  .post(protect, authorize('publisher', 'admin'), createCollege)

router.route('/:id')
  .get(getCollegeById)
  .put(protect, authorize('publisher', 'admin'), updateCollege)
  .delete(protect, authorize('publisher', 'admin'), deleteCollege)

module.exports = router