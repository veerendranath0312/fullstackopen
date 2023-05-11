require('../index.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')

const helper = require('./test_helper.js')
const Blog = require('../models/blog.js')

// Create superagent
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog posts should have id property', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Using Forms in React',
    author: 'Dave Ceddia',
    url: 'https://daveceddia.com/react-forms/',
    likes: 285,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
})

test('If the likes property is missing, it will default to zero', async () => {
  const newBlog = {
    title: 'Using Forms in React',
    author: 'Dave Ceddia',
    url: 'https://daveceddia.com/react-forms/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  const blog = blogs.find((blog) => blog.title === 'Using Forms in React')
  expect(blog.likes).toBe(0)
})

test('blog without content is not added', async () => {
  const newBlog = {
    author: 'Kent C. Dodds',
    url: 'https://kentcdodds.com/blog/props-vs-state',
    likes: 2022,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
