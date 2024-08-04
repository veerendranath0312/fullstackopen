const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) =>
    console.log('Error occured while connecting to MongoDB: ', err.message)
  )

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'A name is required'],
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (number) {
        return /^(\d{2}|\d{3})-[0-9]+$/g.test(number)
      },
      message:
        'Phone number should be in the following format: 09-1234556 and 040-22334455',
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
