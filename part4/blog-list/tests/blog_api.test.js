const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const Blog = require('../models/blog.js')
const { initialBlogs, blogsInDb } = require('./api_test_helper.js')
const app = require('../app.js')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map((blog) => Blog.create(blog))
  await Promise.all(blogObjects)
})

test('blogs are returned as JSON', async () => {
  // Verify that the blog list application returns the blog post in the JSON format
  const response = await api
    .get('/api/v1/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // Verify that the blog list application return the correct number of blogs
  assert.equal(initialBlogs.length, response.body.results)
})

test('unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/v1/blogs')

  const allHaveId = response.body.data.blogs.map((blog) =>
    blog.hasOwnProperty('id')
  )
  assert(allHaveId)
})

test('a valid blog can be created', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'Test URL',
    likes: 0,
  }

  const response = await api
    .post('/api/v1/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  assert.equal(blogsAtEnd.length, initialBlogs.length + 1)
  assert.strictEqual(response.body.data.blog.title, newBlog.title)
})

test('blogs likes property set to 0 by default', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'Test URL',
  }

  const response = await api
    .post('/api/v1/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.data.blog.likes, 0)
})

test('should return 400 if title or url properties are missing', async () => {
  const newBlog = {
    title: '',
    author: 'Test Author',
    url: 'Test URL',
  }

  const response = await api
    .post('/api/v1/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  // assert.strictEqual(response.body.data.blog.likes, 0)
})

after(() => {
  mongoose.connection.close()
})
