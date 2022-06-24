const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
} else if (process.argv.length > 3 && process.argv.length < 5) {
  console.log(
    'Please provide the details correctly: node mongo.js <password> <name> <number>'
  )
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://admin:${password}@phonebook.hetrwbn.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// Create a newcontact if there are 5 args
if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('Connected to DB')

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
      })

      return person.save()
    })
    .then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
}

// Get all contacts if there are only 3 args
if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('Phonebook:')
      return Person.find({})
    })
    .then(persons => {
      persons.forEach(contact => {
        console.log(`${contact.name} ${contact.number}`)
      })
      mongoose.connection.close()
    })
}
