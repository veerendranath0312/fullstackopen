const Header = props => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
};

const Part = props => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  );
};

const Content = props => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
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
      <p>Number of exercises {total}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course} />

      <Content parts={course.parts} />

      <Total parts={course.parts} />
    </div>
  );
};

export default App;
