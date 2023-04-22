import React from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons.js";

function App() {
  const [persons, setPersons] = React.useState([]);

  const [formData, setFormData] = React.useState({
    newName: "",
    newNumber: "",
    filter: "",
  });
  const [notification, setNotification] = React.useState(null);

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

  function handleNotification(msgObj) {
    setNotification(msgObj);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  // Add new person to 'persons' state on clicking 'add' button
  function addPerson(event) {
    event.preventDefault();

    // Check if both fields are empty
    if (!formData.newName || !formData.newNumber) {
      handleNotification({
        message: "Enter valid name & number!",
        status: "failed",
      });
      return;
    }

    // Check if the person already exists
    const person = persons.find((person) => person.name === formData.newName);

    // If person exists and user want to update the number,
    // then update the old number with a new number
    if (person) {
      const confirmUpdate = window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      );

      confirmUpdate && updatePhoneNumber(person);
      return;
    }

    // If not, Create a new person
    const newPerson = {
      name: formData.newName,
      number: formData.newNumber,
    };

    // Add person to database
    personService.createPerson(newPerson).then((createdPerson) => {
      handleNotification({
        message: `Added ${createdPerson.name}`,
        status: "success",
      });

      setPersons((prevPersons) => [...prevPersons, createdPerson]);
    });
  }

  function updatePhoneNumber(person) {
    const updatedPerson = { ...person, number: formData.newNumber };
    personService
      .updatePerson(person.id, updatedPerson)
      .then((savedPerson) => {
        handleNotification({
          message: `Updated ${savedPerson.name}`,
          status: "success",
        });

        setPersons((prevPersons) =>
          prevPersons.map((item) =>
            item.id === person.id ? savedPerson : item
          )
        );
      })
      .catch((error) => {
        handleNotification({
          message: `${person.name} has already been removed from server`,
          status: "failed",
        });

        setPersons((prevPersons) =>
          prevPersons.filter((item) => item.id !== person.id)
        );
      });
    console.log("Phone number updated...");
  }

  // Delete person
  function handleDelete(id) {
    const person = persons.find((person) => person.id === id);

    const confirmDelete = window.confirm(`Delete ${person.name} ?`);

    // If user confirms then delete the user
    if (confirmDelete) {
      personService
        .deletePerson(id)
        .then(() => {
          console.log(`Deleted ${person.name}`);
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
        })
        .catch((error) => {
          handleNotification({
            message: `${person.name} has already been removed from server`,
            status: "failed",
          });

          setPersons((prevPersons) =>
            prevPersons.filter((item) => item.id !== person.id)
          );
        });
    }
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(formData.filter.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter filterString={formData.filter} handleChange={handleChange} />

      <h2 style={{ color: "orange" }}>Add a new</h2>
      <PersonForm
        formData={formData}
        handleChange={handleChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
