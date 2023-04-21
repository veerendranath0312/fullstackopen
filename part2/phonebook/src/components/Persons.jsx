import Person from "./Person";

function Persons(props) {
  // Creating <Person /> elements
  const personElements = props.persons.map((person) => (
    <Person
      key={person.id}
      name={person.name}
      number={person.number}
      handleDelete={() => props.handleDelete(person.id)}
    />
  ));

  return <div>{personElements}</div>;
}

export default Persons;
