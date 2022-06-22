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
  name: String,
  number: String
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
