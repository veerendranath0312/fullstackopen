const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://veerendranath0312:${password}@phonebook.weuqvk3.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=phonebook`

// Connecting to DB
mongoose.connect(url).then(() => console.log('Connected to MongoDB'))

// Creating Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Creating Model
const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
  // Saving data to DB if name and number provided through command line arguments
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  newPerson.save().then((data) => {
    console.log(`added ${data.name} ${data.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  // If not fetch the data from DB
  Person.find({}).then((persons) => {
    console.log('Phonebook:')
    persons.forEach((person) => console.log(`${person.name} ${person.number}`))

    mongoose.connection.close()
  })
}
