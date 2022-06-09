import { useEffect, useState } from 'react';

import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import personServer from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchStr, setSearchStr] = useState('');

  const handleNewName = event => setNewName(event.target.value);
  const handleNewNumber = event => setNewNumber(event.target.value);
  const handleSearchStr = event => setSearchStr(event.target.value);

  // Find the contact
  const findContact = newName =>
    persons.find(person => person.name === newName);

  // useEffect hook: runs along with the first render
  // GET ALL CONTACTS
  useEffect(() => {
    personServer.getAll().then(initialNotes => setPersons(initialNotes));
  }, []);

  // CREATE A CONTACT
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

    personServer.create(newContact).then(newNote => {
      setPersons(persons.concat(newNote));
      setNewName('');
      setNewNumber('');
    });
  };

  // DELETE A CONTACT
  const deleteContact = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personServer
        .deleteContact(person.id)
        .then(response => {
          setPersons(persons.filter(contact => contact.id !== person.id));
        })
        .catch(err => console.log(err));
    }
  };

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
      <Persons
        filteredContacts={filteredContacts}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
