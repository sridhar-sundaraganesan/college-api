const express = require('express')
const app = express()
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')
const collegeRoutes = require('./routes/collegeRoutes')


app.use(express.json())
dotenv.config({ path: './config/config.env' })

if (process.env.NODE_ENV === 'development') {
  app.use(morgan())
}
const PORT = process.env.PORT || 3049

//Connect to Database
connectDB()

app.use('/api/v1/colleges', collegeRoutes)

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode and listening on ${PORT}`.yellow.inverse)
})
