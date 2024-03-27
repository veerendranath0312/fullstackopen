import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setFilterStr] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const isPersonAvailable = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (isPersonAvailable) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons((prevPersons) => {
      return [...prevPersons, { name: newName, number: newNumber }]
    })
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterStrChange = (event) => setFilterStr(event.target.value)

  // Filtering the persons based on the filterStr
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filterStr.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        filterStr={filterStr}
        handleFilterStrChange={handleFilterStrChange}
      />

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
