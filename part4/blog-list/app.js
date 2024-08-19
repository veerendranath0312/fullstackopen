const express = require('express')
const cors = require('cors')
const blogsRouter = require('./routes/blogRoutes')
const { globalErrorHandler } = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/blogs', blogsRouter)

app.use(globalErrorHandler)

module.exports = app
