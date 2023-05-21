const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const middleware = require('./utils/middleware.js')

const app = express()

app.use(cors())
app.use(express.json()) // parse incoming JSON payload

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownRequest)
app.use(middleware.errorHandler)

module.exports = app
