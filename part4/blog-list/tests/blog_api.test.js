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

describe('Updating a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 24000

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(24000)
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 24001

    const nonExistingId = '645de9072d942488890933ef'

    await api.put(`/api/blogs/${nonExistingId}`).send(blogToUpdate).expect(404)

    const response = await api.get('/api/blogs')
    const blog = response.body.find(
      (blog) => blog.id === blogToUpdate.id.toString()
    )
    expect(blog.likes).toBe(23855)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 24002

    const invalidId = '5a3d5da59070081a82a3445'

    await api.put(`/api/blogs/${invalidId}`).send(blogToUpdate).expect(400)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map((blog) => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
