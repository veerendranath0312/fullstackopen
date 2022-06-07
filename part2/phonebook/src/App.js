import { useEffect, useState } from 'react';
import axios from 'axios';

import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchStr, setSearchStr] = useState('');

  // useEffect hook: runs along with the first render
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data));
  }, []);

  // Find the contact
  const findContact = newName =>
    persons.find(person => person.name === newName);

  const addContact = event => {
    event.preventDefault();

    // Checking if the contact is already present or not
    if (findContact(newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    const newContact = {
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(newContact));
    setNewName('');
    setNewNumber('');
  };

  const handleNewName = event => setNewName(event.target.value);
  const handleNewNumber = event => setNewNumber(event.target.value);
  const handleSearchStr = event => setSearchStr(event.target.value);

  // Everytime the component renders we are filtering the persons array
  // and displaying the persons that match the search query/string
  const filteredContacts = persons.filter(person =>
    person.name.toLowerCase().includes(searchStr.toLowerCase())
  );

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Filter searchStr={searchStr} handleSearchStr={handleSearchStr} />

      <PersonForm
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons filteredContacts={filteredContacts} />
    </div>
  );
};

export default App;
