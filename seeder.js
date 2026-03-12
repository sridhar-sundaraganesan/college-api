const colors = require('colors')
const dotenv = require('dotenv')
const fs = require('fs')
const College = require('./models/College')
const Course = require('./models/Course')
const mongoose = require('mongoose')

//To Load env vars
dotenv.config({ path: './config/config.env' })

//Connect to Database
mongoose.connect(process.env.MONGO_URI)

const colleges = JSON.parse(fs.readFileSync(`${__dirname}/_data/colleges.json`, 'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'))

const importData = async () => {
  try {
    await College.create(colleges)
    await Course.create(courses)
    console.log(`Data imported...`.green.inverse)
    process.exit()
  } catch (err) {
    console.log('Error:' + err)
  }
}

const deleteData = async () => {
  try {
    await College.deleteMany()
    await Course.deleteMany()
    console.log(`Data Deleted...`.red.inverse)
    process.exit()
  } catch (err) {
    console.log(`Error: ` + err)
  }
}


if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}