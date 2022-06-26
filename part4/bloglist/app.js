const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const blogRouter = require('./routes/blogRouter.js')
const logger = require('./utils/logger.js')
const config = require('./utils/config')
const middleware = require('./utils/middleware.js')

const app = express()

logger.info(`Connecting to MongoDB: ${config.MONGODB_URI}`)

app.use(cors())
app.use(express.json())

// Connecting to MongoDBs
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error(`Error while connected to DB: ${error.message}`)
  })

// Base Route
app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)
module.exports = app
