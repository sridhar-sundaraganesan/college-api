const College = require('../models/College')


exports.getAllColleges = async (req, res, next) => {
  try {
    const colleges = await College.find()
    res.status(200).json({ success: true, count: colleges.length, data: colleges })
  } catch (err) {
    res.status(404).json({ success: false, data: err })
  }
}

exports.createCollege = async (req, res, next) => {
  try {
    const college = await College.create(req.body)
    res.status(200).json({ success: true, data: college })
  } catch (err) {
    res.status(400).json({ success: false, data: `No data to create` })
  }
}


exports.getCollegeById = async (req, res, next) => {
  try {
    const colleges = await College.findById(req.params.id)
    res.status(200).json({ success: true, data: colleges })
  } catch (err) {
    res.status(404).json({ success: false, data: `No college found on id: ${req.params.id}` })
  }
}

exports.updateCollege = async (req, res, next) => {
  try {
    const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!college) {
      res.status(404).json({ success: false, data: `No data found with id of ${req.params.id}` })
    }
    res.status(200).json({ success: true, data: college })
  } catch (err) {
    res.status(404).json({ success: false, data: `No data found with id of ${req.params.id}` })
  }
}


exports.deleteCollege = async (req, res, next) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: true, data: 'Data deleted' })
  } catch (err) {
    res.status(400).json({ success: false, data: 'Data not deleted' })
  }
}