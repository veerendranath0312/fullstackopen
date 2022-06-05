import React from 'react';

const Header = props => {
  const { courseName } = props;

  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

const Part = ({ singlePart }) => {
  return (
    <div>
      <p>
        {singlePart.name} {singlePart.exercises}
      </p>
    </div>
  );
};

const Content = props => {
  const { parts } = props;
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} singlePart={part} />
      ))}
    </div>
  );
};

const Total = props => {
  // object destructing
  const { parts } = props;

  // Using reduce method to get sum of all exercises
  const total = parts.reduce((sum, acc) => sum + acc.exercises, 0);

  return (
    <div>
      <h4>Total of {total} exercises</h4>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
