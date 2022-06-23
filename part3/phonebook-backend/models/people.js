require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err =>
    console.log(`error while connecting to MongoDB: ${err.message}`)
  );

// Creating a Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    // custom validation
    validate: {
      validator: function (value) {
        let isValid = false;
        // regex to check if the string length is 2 or 3
        const lengthRegex = new RegExp('^[0-9]{2,3}$');
        // regex to check if the string contains only digits
        const digitRegex = new RegExp('^[0-9]+$');

        if (value.includes('-') && value.split('-').length < 3) {
          const numArray = value.split('-');

          // eg. 09-1234556 and 040-22334455 are valid phone numbers
          // eg. 1234556, 1-22334455 and 10-22-334455 are invalid

          isValid =
            lengthRegex.test(numArray[0]) && digitRegex.test(numArray[1]);
          return isValid;
        } else if (value.length >= 8 && digitRegex.test(value)) {
          isValid = true;
        }

        return isValid;
      },
      message:
        'Provide a valid phone number: 09-1234556, 040-1234567, 123456789'
    }
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
// Create a model using Schema
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
