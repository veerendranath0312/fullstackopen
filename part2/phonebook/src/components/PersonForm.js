import React from 'react';

const PersonForm = props => {
  const { newName, newNumber, handleNewName, handleNewNumber, addContact } =
    props;

  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
