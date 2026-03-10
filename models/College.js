const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
  name: { type: String, trim: true, unique: true, required: [true, 'Please enter college name'] },
  founderName: { type: String, required: [true, 'Please enter founder name'] },
  coursesOffering: { type: [String], required: [true, 'Please enter courses that are available'], enum: ['Biomedical Engineering', 'Mechanical Engineering', 'Biotechnology', 'Chemical Engineering', 'ECE', 'EEE', 'Civil Engineering'] },
  contactNumber: { type: Number, required: [true, 'Please provide phone number'] },
  totalNoOfStudents: { type: Number, required: [true, 'Please enter total number of students'] },
  jobPlacementAnually: { type: Number, required: [true, 'Please enter placed students'] },
  hostel: { type: Boolean, default: true },
  affiliation: { type: Boolean, default: false },
  address: { type: String, required: [true, 'Please enter address'] },
})

module.exports = mongoose.model('College', collegeSchema)