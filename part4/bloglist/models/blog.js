const mongoose = require('mongoose')

// Creating a schema
const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    require: true
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  }
})

// modifying the returned document
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Create a model using schema
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
