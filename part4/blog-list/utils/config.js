require('dotenv').config()

const PORT = process.env.port || 8080
const dbURL =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = { PORT, dbURL }
