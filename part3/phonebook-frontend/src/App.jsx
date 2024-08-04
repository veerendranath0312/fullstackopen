import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterStr, setFilterStr] = useState('')
  const [notification, setNotification] = useState(null)

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
        .catch(() => {
          setNotification({
            message: `Information of ${person.name} has already been removed from server`,
            type: 'error-msg',
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter((p) => p.id !== person.id))
        })

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personsService
      .createPerson(newPerson)
      .then((createdPerson) => {
        setPersons((prevPersons) => {
          return [...prevPersons, createdPerson]
        })
        setNotification({
          message: `Added ${createdPerson.name}`,
          type: 'success-msg',
        })
        setTimeout(() => {
          setNotification(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.error,
          type: 'error-msg',
        })
        setTimeout(() => setNotification(null), 3000)
      })
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterStrChange = (event) => setFilterStr(event.target.value)

  // Deleting a person
  const handleDeletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService.deletePerson(personToDelete.id).then(() => {
        // axios.delete does not return any data after performing delete request
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== personToDelete.id)
        )
      })
    }
  }

  // Filtering the persons based on the filterStr
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filterStr.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
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
