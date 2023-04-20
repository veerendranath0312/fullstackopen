import React from "react";
import "./App.css";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = React.useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [formData, setFormData] = React.useState({
    newName: "",
    newNumber: "",
    filter: "",
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
