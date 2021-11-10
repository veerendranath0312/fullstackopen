import React from 'react';

const Form = props => {
  const { handleFilter } = props;
  return (
    <div>
      find countries <input onChange={handleFilter} />
    </div>
  );
};

export default Form;
