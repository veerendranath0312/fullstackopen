const Blog = require('../models/blog.js')

const initialBlogs = [
  {
    title: 'The const Deception',
    author: 'Josh W Comeau',
    url: 'https://www.joshwcomeau.com/javascript/the-const-deception/',
    likes: 23855,
  },
  {
    title: 'Data Binding in React',
    author: 'Josh W Comeau',
    url: 'https://www.joshwcomeau.com/react/data-binding/',
    likes: 33855,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
