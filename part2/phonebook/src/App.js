import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = props => {
  const [persons, setPersons] = useState(props.persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterString, setFilterString] = useState('');

  // updating the persons state, onSubmit and
  // reset the newName state to its initial value
  const addPerson = event => {
    event.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    persons.find(person => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPersonObject));

    setNewName('');
    setNewNumber('');
  };

  // updating the newName state, onChange in input field
  const handleSetNewName = event => {
    setNewName(event.target.value);
  };

  // updating the newNumber state, onChange in input field
  const handleSetNewNumber = event => {
    setNewNumber(event.target.value);
  };

  // filter the persons state based on the filterString
  const handleFilter = event => {
    setFilterString(event.target.value);
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().startsWith(filterString)
    );
    setPersons(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterString={filterString} handleFilter={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleSetNewName={handleSetNewName}
        newNumber={newNumber}
        handleSetNewNumber={handleSetNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
