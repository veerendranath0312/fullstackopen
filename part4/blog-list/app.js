const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
const middleware = require('./utils/middleware.js')
const auth = require('./utils/auth.js')

const app = express()

app.use(cors())
app.use(express.json()) // parse incoming JSON payload

// users with a valid token can create blogs
app.use('/api/blogs', auth, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', loginRouter)

app.use(middleware.unknownRequest)
app.use(middleware.errorHandler)

module.exports = app
