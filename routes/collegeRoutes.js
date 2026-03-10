const express = require('express')
const { getAllColleges, getCollegeById, createCollege, updateCollege, deleteCollege } = require('../controller/collegeController')
const router = express.Router()


router.route('/')
  .get(getAllColleges)
  .post(createCollege)

router.route('/:id')
  .get(getCollegeById)
  .put(updateCollege)
  .delete(deleteCollege)

module.exports = router