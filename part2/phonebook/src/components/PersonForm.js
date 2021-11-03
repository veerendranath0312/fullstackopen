import React from 'react';

const PersonForm = props => {
  const {
    addPerson,
    newName,
    handleSetNewName,
    newNumber,
    handleSetNewNumber,
  } = props;

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input type="text" value={newName} onChange={handleSetNewName} />
        </div>
        <div>
          number:{' '}
          <input type="text" value={newNumber} onChange={handleSetNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
