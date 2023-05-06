const app = require('./app.js')
const config = require('./utils/config.js')
const connectDB = require('./db/connect.js')

// Connect to MongoDB
const start = async () => {
  try {
    await connectDB(config.MONGODB_URI)
    app.listen(config.PORT, () => {
      console.log(`Server running at http://localhost:${config.PORT}/`)
    })
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

start()
