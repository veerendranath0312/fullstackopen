require('dotenv').config()
const mongoose = require('mongoose')

const app = require('./app')
const PORT = process.env.port || 8080

// NOTE: Generally it is better to ensure that the server starts only after a successful
// database connection. This approach helps to avoid potential issues where the server is
// running but unable to handle requests properly due to the database being unavailable.
// By ensuring the database connection is established first, you can provide a more reliable
// robust application
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB...')
    // Start the server only after a successful database connection
    startServer()
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error.message)
    process.exit(1)
  }
}

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}...`)
  })
}

connectToDatabase()
