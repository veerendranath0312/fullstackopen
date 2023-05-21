require('../index.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app.js')
const User = require('../models/user.js')
const helper = require('./test_helper.js')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('johnwick1234', 10)
  const newUser = new User({
    username: 'john',
    name: 'John Wick',
    passwordHash,
  })
  await newUser.save()
})

describe('creating a user', () => {
  test('succeeds with a valid username and password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'veerendra',
      name: 'Veerendranath',
      password: 'veerendra1234',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('fails with status code 400 if user is invalid', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'john',
      name: 'John Wick',
      password: 'john1234',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
