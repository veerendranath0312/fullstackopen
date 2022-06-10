import { useEffect, useState } from 'react';

import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personServer from './services/persons';
import './styles.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchStr, setSearchStr] = useState('');
  const [notification, setNotification] = useState(null);

  const handleNewName = event => setNewName(event.target.value);
  const handleNewNumber = event => setNewNumber(event.target.value);
  const handleSearchStr = event => setSearchStr(event.target.value);

  // General functions
  const findContact = newName =>
    persons.find(person => person.name === newName);

  const notificationFunc = (message, isSuccess) => {
    setNotification({ message, isSuccess });

    // Making notification disappear after 3 sec
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // useEffect hook: runs along with the first render
  // GET ALL CONTACTS
  useEffect(() => {
    personServer.getAll().then(initialNotes => setPersons(initialNotes));
  }, []);

  // UPDATE A CONTACT
  const updateContact = (id, newContact) => {
    personServer
      .update(id, newContact)
      .then(updatedContact => {
        notificationFunc(`Updated ${newName}`, true);

        setPersons(
          persons.map(person => (person.id === id ? updatedContact : person))
        );
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        notificationFunc(
          `Information of ${newName} has already been removed from server`,
          false
        );
        // we are getting the latest data from the server
        personServer.getAll().then(allContacts => setPersons(allContacts));
        console.log(error.message);
      });
  };

  // CREATE A CONTACT
  const addContact = event => {
    event.preventDefault();

    // Finding if there is a contact with the same name
    const existingContact = findContact(newName);

    // If the contact exists then update the contact based on user preference
    if (existingContact) {
      // prettier-ignore
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = existingContact.id;
        const newContact = { name: newName, number: newNumber };
        
        updateContact(id, newContact);
      }
      return;
    }

    const newContact = { name: newName, number: newNumber };

    personServer.create(newContact).then(newNote => {
      notificationFunc(`Added ${newName}`, true);
      setPersons(persons.concat(newNote));
      setNewName('');
      setNewNumber('');
    });
  };

  // DELETE A CONTACT
  const deleteContact = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personServer
        .deleteContact(person.id)
        .then(response => {
          setPersons(persons.filter(contact => contact.id !== person.id));
        })
        .catch(err => console.log(err));
    }
  };

  // Everytime the component renders we are filtering the persons array
  // and displaying the persons that match the search query/string
  const filteredContacts = persons.filter(person =>
    person.name.toLowerCase().includes(searchStr.toLowerCase())
  );

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Notification notification={notification} />

      <Filter searchStr={searchStr} handleSearchStr={handleSearchStr} />

      <PersonForm
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons
        filteredContacts={filteredContacts}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
