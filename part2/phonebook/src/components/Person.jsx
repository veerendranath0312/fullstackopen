import React from "react";

function Person(props) {
  return (
    <p>
      {props.name} {props.number}{" "}
      <button onClick={props.handleDelete}>Delete</button>
    </p>
  );
}

export default Person;
