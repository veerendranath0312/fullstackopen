import Part from "./Part";

function Content(props) {
  const partElements = props.parts.map((part) => (
    <Part key={part.id} part={part} />
  ));

  // Calculate total number of exercises using .reduce()
  const totalExercises = props.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <div>
      {partElements}
      <p>
        <b>total of {totalExercises} exercises</b>
      </p>
    </div>
  );
}

export default Content;
