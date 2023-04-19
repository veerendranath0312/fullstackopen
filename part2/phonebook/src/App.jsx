import React from "react";
import "./App.css";
import Persons from "./components/Persons";
import Person from "./components/Person";

function App() {
  const [persons, setPersons] = React.useState([
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-1234567",
    },
  ]);

  const [formData, setFormData] = React.useState({
    newName: "",
    newNumber: "",
  });

  // Update the 'formData' state on every change of input field
  // The properties of 'formData' should match with values of 'name' attributes
  // formData { newName: '' } === <input type="text" name="newName" />
  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  // Add new person to 'persons' state on clicking 'add' button
  function addPerson(event) {
    event.preventDefault();

    setPersons((prevPersons) => {
      // Check if the person is already exists in 'persons'
      const person = prevPersons.find(
        (person) => person.name === formData.newName
      );

      // If exists, return the 'prevPersons'
      if (person) {
        alert(`${formData.newName} is already added to phonebook`);
        return [...prevPersons];
      }

      // If not, add the person to 'persons'
      return [
        ...prevPersons,
        {
          id: prevPersons.length + 1,
          name: formData.newName,
          number: formData.newNumber,
        },
      ];
    });
  }

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="name">name: </label>
          <input
            type="text"
            name="newName"
            id="name"
            value={formData.newName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input
            type="text"
            name="newNumber"
            id="number"
            value={formData.newNumber}
            onChange={handleChange}
          />
        </div>
        <button>add</button>
      </form>
      <h2>Numbers</h2>

      <Persons persons={persons} />
    </div>
  );
}

export default App;
