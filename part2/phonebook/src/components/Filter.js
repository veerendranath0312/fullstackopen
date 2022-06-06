import React from 'react';

const Filter = props => {
  const { searchStr, handleSearchStr } = props;
  return (
    <div>
      filter shows with <input value={searchStr} onChange={handleSearchStr} />
    </div>
  );
};

export default Filter;
