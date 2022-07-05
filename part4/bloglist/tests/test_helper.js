const Blog = require('../models/blog.js')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
