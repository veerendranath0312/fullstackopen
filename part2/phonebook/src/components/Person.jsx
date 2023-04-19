import React from "react";

function Person(props) {
  return (
    <p>
      {props.name} {props.number}
    </p>
  );
}

export default Person;
