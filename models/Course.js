const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please enter course name'] },
  courseDuration: { type: Number, required: [true, 'Please enter course duration'] },
  hod: { type: String, required: [true, 'Please enter HOD name'] },
  hodContact: { type: Number, required: [true, 'Please enter HOD contact details'] },
  facultyNames: { type: [String], required: [true, 'Please enter respective faculty names'] },
  placementsLastYear: { type: Number, required: [true, 'Please enter last year placement number'] },
  preRequisite: { type: [String], enum: ['Biomaths', 'BioComputer', 'ComputerMaths'] },
  createdAt: { type: Date, default: Date.now },
  college: { type: mongoose.Schema.ObjectId, ref: 'College', required: true }
})

module.exports = mongoose.model('Course', courseSchema)