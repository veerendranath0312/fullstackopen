import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  // updating the persons state, onSubmit and
  // reset the newName state to its initial value
  const addPerson = event => {
    event.preventDefault();

    const newPersonObject = {
      name: newName,
    };

    setPersons(persons.concat(newPersonObject));
    setNewName('');
  };

  // updating the newName state, onChange in input field
  const handleSetNewName = event => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input type="text" value={newName} onChange={handleSetNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
