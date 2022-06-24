require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const {
  getInfo,
  getAllPeople,
  createPerson,
  getPersonById,
  deletePersonById,
  updatePersonById
} = require('./controllers/peopleController.js')

// Middlewares
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', req => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// Route handlers
app.get('/info', getInfo)

app.get('/api/persons', getAllPeople)
app.post('/api/persons', createPerson)

app.get('/api/persons/:id', getPersonById)
app.delete('/api/persons/:id', deletePersonById)
app.put('/api/persons/:id', updatePersonById)

// Error handling middleware
const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Listening to server at port ${PORT}`)
})
