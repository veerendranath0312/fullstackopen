import React from 'react';
import Person from './Person';

const Persons = ({ filteredContacts }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {filteredContacts.map(person => (
            <Person key={person.id} name={person.name} number={person.number} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
