import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setFilterStr] = useState('')

  // Fetching initial persons
  // useEffect hook is used to perform side effects in function components
  // The empty dependency array [] as the second argument ensures that this effect runs only once after the initial render
  useEffect(() => {
    personsService.getAllPersons().then((persons) => setPersons(persons))
  }, [])

  // Adding a new person
  const handleSubmit = (event) => {
    event.preventDefault()

    const person = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    // Check if the person object exists
    // Ask for user confirmation to replace the old number
    if (
      person &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      // Create a new person object with the updated number
      const newPerson = { ...person, number: newNumber }
      // Call the service to update the person's information
      personsService
        .updatePerson(person.id, newPerson)
        .then((updatedPerson) => {
          // Update the state with the new person information
          setPersons(
            persons.map((p) => (p.id === person.id ? updatedPerson : p))
          )
          setNewName('')
          setNewNumber('')
        })

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personsService.createPerson(newPerson).then((createdPerson) => {
      setPersons((prevPersons) => {
        return [...prevPersons, createdPerson]
      })
      setNewName('')
      setNewNumber('')
    })
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterStrChange = (event) => setFilterStr(event.target.value)

  // Deleting a person
  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(person.id)
        .then((deletedPerson) =>
          setPersons(persons.filter((person) => person.id !== deletedPerson.id))
        )
    }
  }

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
      <Persons
        persons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App
