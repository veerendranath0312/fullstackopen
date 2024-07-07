const express = require('express')

const app = express()
app.use(express.json()) // Parse input JSON data

const PORT = process.env.PORT || 8080

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/info', (req, res) => {
  res.status(200).send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  res.status(200).json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find((person) => person.id === id)

  if (!person) {
    return res.status(404).json({ error: `Person with id ${id} is not found` })
  }

  res.status(200).json(person)
})

app.post('/api/persons', (req, res) => {
  const data = req.body

  // Check if the name and number provided
  // Status code: 400 Bad Request
  if (!data.name || !data.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const person = persons.find(
    (person) => person.name.toLowerCase() === data.name.toLowerCase()
  )

  // Check the uniqueness of the name
  // Status code: 403 Forbidden
  // The request contained valid data and was understood by the server, but the server is refusing action.
  // e.g. creating a duplicate record where only one is allowed
  if (person) {
    res.status(403).json({ error: 'name must be unique' })
  }

  const newPerson = { ...data, id: Math.floor(Math.random() * 100000000) }
  persons = [...persons, newPerson]
  res.status(201).json(persons)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter((person) => person.id !== id)

  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}...`)
})
