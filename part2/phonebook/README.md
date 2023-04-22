# Phonebook

In this exercise, we created a simple Phonebook.

The Phonebook has the ability to add person, update & delete a person as well as its phone number. Person's names should be unique, which means that users cannot add names that already exist in the Phonebook. A search field is also available in the app to filter the people by their name.

This initial state of the application is stored in a file `db.json`, which correspond to a list of users along with their numbers. This file is used by the tool `JSON Server` that acts as a backend server where the data is stored.

## Start the application

To start an application, do the following :

```bash
# Install dependancies
$ npm install

# Start the JSON Server in one terminal
$ npm run server

# On another terminal, start the application
$ npm run dev
```

You can then access the app on : [http://localhost:5173/](http://localhost:5173/)

You can also see the content of the JSON Server by heading to [http://localhost:3001/persons](http://localhost:3001/persons)
