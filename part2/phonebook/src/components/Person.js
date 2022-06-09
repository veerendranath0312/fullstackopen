import React from 'react';

const Person = ({ person, deleteContact }) => {
  return (
    <p>
      {person.name} {person.number}{' '}
      <button onClick={() => deleteContact(person)}>delete</button>
    </p>
  );
};

export default Person;
