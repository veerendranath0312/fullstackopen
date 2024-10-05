const Blog = require('../models/blog')

// Using JSend specification to send the response
// JSend is a specification for a simple, no-frills, JSON based format for application-level communication.

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
    res.status(200).json({
      status: 'success',
      results: blogs.length,
      data: { blogs },
    })
  } catch (error) {
    next(error)
  }
}

const getBlog = (req, res, next) => {}

const createBlog = async (req, res, next) => {
  const data = req.body

  try {
    const blog = await Blog.create(data)
    res.status(201).json({ status: 'success', data: { blog } })
  } catch (error) {
    next(error)
  }
}

const updateBlog = (req, res, next) => {}

const deleteBlog = (req, res, next) => {}

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
}
