import React from 'react';
import Person from './Person';

const Persons = ({ filteredContacts, deleteContact }) => {
  return (
    <div>
      {filteredContacts.map(person => (
        <Person key={person.id} person={person} deleteContact={deleteContact} />
      ))}
    </div>
  );
};

export default Persons;
