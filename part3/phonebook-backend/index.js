require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person.js')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.static('dist'))
app.use(cors())
app.use(express.json()) // Parse input JSON data

// Using tiny configuration
// app.use(morgan('tiny'))

// First define a custom token to log the request body
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

// then use that token in the format string of predefined tokens
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// Get the info of People
app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    res.status(200).send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `)
  })
})

// Fetch all the people
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.status(200).json(persons)
  })
})

// Get a person based on ID
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.status(200).json(person)
      } else {
        res.status(404).json({ message: `Person with id ${id} not found` })
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const data = req.body

  // Check if the name and number provided
  // Status code: 400 Bad Request
  // COMMENTING: Now the validation will be done from the database side
  // if (!data.name || !data.number) {
  //   return res.status(400).json({ error: 'name or number missing' })
  // }

  // const person = persons.find(
  //   (person) => person.name.toLowerCase() === data.name.toLowerCase()
  // )

  // Check the uniqueness of the name
  // Status code: 403 Forbidden
  // The request contained valid data and was understood by the server, but the server is refusing action.
  // e.g. creating a duplicate record where only one is allowed
  // if (person) {
  //   res.status(403).json({ error: 'name must be unique' })
  // }

  const newPerson = new Person(data)
  newPerson
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(id, person, { new: true })
    .then((updatedPerson) => res.status(200).json(updatedPerson))
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}...`)
})
