const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./routes/blogRoutes')
const userRouter = require('./routes/userRoutes')
const loginRouter = require('./routes/loginRoute')
const { globalErrorHandler } = require('./utils/middleware')

mongoose.set('strictQuery', false)

mongoose
  .connect(config.dbURL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/blogs', blogsRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/login', loginRouter)

app.use(globalErrorHandler)

module.exports = app
