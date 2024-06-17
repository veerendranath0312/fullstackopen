import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setFilterStr] = useState('')

  // useEffect hook is used to perform side effects in function components
  // The empty dependency array [] as the second argument ensures that this effect runs only once after the initial render
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => setPersons(response.data))
  }, [])

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
