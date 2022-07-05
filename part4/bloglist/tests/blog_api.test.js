const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/blog.js')
const helper = require('./test_helper.js')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('initial blogs', () => {
  test('when blog list returns correct amount of blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('The unique identifier property of the blog posts is named id', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
  })
})

describe('create a new blog', () => {
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

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogsContent = blogsAtEnd.map(blog => {
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

    const blogsAtEnd = await helper.blogsInDb()
    const blogs = blogsAtEnd.map(blog => {
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
})

describe('delete a single blog', () => {
  test('succeeds when id is valid', async () => {
    const blogs = await api.get('/api/blogs')
    const noteToBeDeleted = blogs.body[0]

    await api.delete(`/api/blogs/${noteToBeDeleted.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(noteToBeDeleted.title)
  })

  test('fails when id is invalid', async () => {
    const id = '62c31cce5b03ab78290ce3a'
    await api.delete(`/api/blogs/${id}`).expect(400)
  })
})

describe('update a single blog', () => {
  test('when a single blog is updated', async () => {
    const blogs = await helper.blogsInDb()
    const blogToBeUpdate = blogs[0]
    const updatedBlog = {
      ...blogToBeUpdate,
      likes: blogToBeUpdate.likes + 10
    }

    await api
      .put(`/api/blogs/${blogToBeUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const foundBlog = blogsAtEnd.find(blog => blog.likes === 952)

    expect(foundBlog.likes).toBe(952)
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})
