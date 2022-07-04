const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/blog.js')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Super Simple Start to ESModules in Node.js',
    author: 'Kent C. Dodds',
    url: 'https://kentcdodds.com/blog/super-simple-start-to-es-modules-in-node-js',
    likes: 942
  },
  {
    title: 'What is JSX?',
    author: 'Kent C. Dodds',
    url: 'https://kentcdodds.com/blog/what-is-jsx',
    likes: 1654
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  // Creating the array of new blog objects
  const blogObjects = initialBlogs.map(blog => new Blog(blog))

  // Saving the blog objects to DB: returns an array of promises
  const blogPromises = blogObjects.map(blog => blog.save())

  // Resolving all the promises at a time
  await Promise.all(blogPromises)
})

test('when blog list returns correct amount of blogs', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('The unique identifier property of the blog posts is named id', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[0].id).toBeDefined()
})

test('When a new blog is created', async () => {
  const newBlog = {
    title: 'useState lazy initialization',
    author: 'Kent C. Dodds',
    url: 'https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates',
    likes: 4654
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const totalBlogs = await api.get('/api/blogs')
  expect(totalBlogs.body).toHaveLength(initialBlogs.length + 1)

  const blogsContent = totalBlogs.body.map(blog => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    }
  })

  expect(blogsContent).toContainEqual({
    title: 'useState lazy initialization',
    author: 'Kent C. Dodds',
    url: 'https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates',
    likes: 4654
  })
})

test('when likes property is missing from the request', async () => {
  const newBlog = {
    title: '4 Examples of the useState Hook',
    author: 'Dave Ceddia',
    url: 'https://daveceddia.com/usestate-hook-examples/'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogs = response.body.map(blog => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    }
  })

  expect(blogs).toContainEqual({
    title: '4 Examples of the useState Hook',
    author: 'Dave Ceddia',
    url: 'https://daveceddia.com/usestate-hook-examples/',
    likes: 0
  })
})

test('when title and url missing', async () => {
  const newBlog = {
    url: 'https://daveceddia.com/usestate-hook-examples/'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})
