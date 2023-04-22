import React from "react";

function Person(props) {
  return (
    <p className="person-item">
      {props.name} - {props.number}{" "}
      <button onClick={props.handleDelete}>Delete</button>
    </p>
  );
}

export default Person;
