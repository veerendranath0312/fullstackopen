# Phonebook API

In this exercise, we implemented a fullstack phonebook app with a backend written in Node.js and a frontend in React.js. The data are saved in a mongodb database and the app is deployed on [Fly.io](https://fly.io/) at the folowing URL.

> https://phonebook-microservice.fly.dev/

## Start the application locally

To start the application:

```bash
# Install dependancies
$ npm install

# create a .env file and put there the MONGODB_URI for connecting to your mongodb database
$ echo "MONGODB_URI=<YOUR-MONGODB-URI>" > .env

# Start the application
$ npm run dev
```

You can then access the app on : http://localhost:8080/
