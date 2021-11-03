import React from 'react';
import Person from './Person';

const Persons = props => {
  const { persons } = props;

  return (
    <div>
      {persons.map(person => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export default Persons;
