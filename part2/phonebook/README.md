# Phonebook

In this exercise, we create a simple Phonebook.

The Phonebook allows users to add, update, and delete entries, including both person and phone number details. Each person's name must be unique; duplicates are not permitted. If a user attempts to add a person whose name already exists, the application notifies them that the person is already in the database and asks if they would like to update the existing entry instead. Additionally, the app features a search function to filter people by their names.

This initial state of the application is stored in a file `db.json`, which correspond to a list of users along with their numbers and id's. This file is used by the tool `JSON Server` that acts as a backend server where the data is stored.

## Start the application

To start an application, do the following :

```bash
# Install dependancies
$ yarn install

# Start the JSON Server in one terminal
$ yarn run server

# On another terminal, start the application
$ yarn run dev
```

You can access the app at [http://localhost:5173/](http://localhost:5173/)

You can view the JSON Server contents at [http://localhost:3001/persons](http://localhost:3001/persons).
