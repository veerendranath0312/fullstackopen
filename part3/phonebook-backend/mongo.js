const mongoose = require('mongoose')

const MONGODB_URI = `mongodb+srv://veerendranath0312:${process.argv[2]}@phonebook.weuqvk3.mongodb.net/test`

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
  const newPerson = Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  newPerson.save().then((savedPerson) => {
    console.log(
      `added ${savedPerson.name} number ${savedPerson.number} to phonebook`
    )
    mongoose.connection.close()
  })
} else {
  Person.find({})
    .then((people) => {
      console.log('phonebook:')
      people.forEach((person) => console.log(`${person.name} ${person.number}`))
      mongoose.connection.close()
    })
    .catch((e) => console.log('fetching people failed: ', e.message))
}
