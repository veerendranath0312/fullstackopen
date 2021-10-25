import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  // caclculating total exercises
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
      <p>total of {total} exercises</p>
    </div>
  );
};

export default Content;
