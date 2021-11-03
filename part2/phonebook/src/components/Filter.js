import React from 'react';

const Filter = props => {
  const { filterString, handleFilter } = props;
  return (
    <div>
      filter shown with{' '}
      <input type="text" value={filterString} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
