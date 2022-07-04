const Blog = require('../models/blog.js')

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
}

const createBlog = async (req, res, next) => {
  const data = req.body

  const newBlog = Blog({
    title: data.title,
    author: data.author,
    url: data.url,
    likes: data.likes
  })

  try {
    const savedBlog = await newBlog.save()
    res.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllBlogs,
  createBlog
}
