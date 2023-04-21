import React from "react";
import axios from "axios";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons.js";

function App() {
  const [persons, setPersons] = React.useState([]);

  const [formData, setFormData] = React.useState({
    newName: "",
    newNumber: "",
    filter: "",
  });

  // The effect function only runs at first render
  React.useEffect(() => {
    personService
      .getAllPersons()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

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

    // Check if the person already exists
    const person = persons.find((person) => person.name === formData.newName);

    // If exists, alert the user and return
    if (person) {
      alert(`${formData.newName} is already added to phonebook`);
      return;
    }

    // If not, Create a new person
    const newPerson = {
      name: formData.newName,
      number: formData.newNumber,
    };

    // Add person to database
    personService.createPerson(newPerson).then((createdPerson) => {
      setPersons((prevPersons) => [...prevPersons, createdPerson]);
    });
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(formData.filter.toLowerCase())
  );

  return (
    <div className="App">
      <h2>Phonebook</h2>

      <Filter filterString={formData.filter} handleChange={handleChange} />

      <h2>Add a new</h2>
      <PersonForm
        formData={formData}
        handleChange={handleChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
}

export default App;
