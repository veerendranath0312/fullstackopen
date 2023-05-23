# Blog List API

In this part we will be building a blog list application, that allows users to save information about interesting blogs they have stumbled across on the internet. For each listed blog we will save the author, title, url, and amount of upvotes from users of the application. The application allows you to create the users, list the users, login using username and password, and create, update, delete, and get the blogs of an authorized user. 

## Start the application locally

To start the application:

```bash
# Install dependancies
$ npm install

# create a .env file and put there the MONGODB_URI for connecting to your mongodb database
$ echo "MONGODB_URI=<YOUR-MONGODB-URI>" > .env
$ echo "TEST_MONGODB_URI=<YOUR-TEST-MONGODB-URI>" > .env

# Set a variable SECRET which is used for digital signature to generate a valid JSON Web Token.
$ echo "JWT_SECRET=secure-secret-phrase" > .env

# Start the application in dev environment
$ npm run dev

# Start the application in prod environment
$ npm start

# Start the application in test environment and run tests
$ run start:test
$ npm test

```

You can then access the app on : http://localhost:8080/
