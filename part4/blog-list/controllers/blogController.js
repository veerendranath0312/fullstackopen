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

const getBlog = async (req, res, next) => {
  const { id } = req.params

  try {
    const blog = await Blog.findById(id)
    res.status(200).json({ status: 'success', data: { blog } })
  } catch (error) {
    next(error)
  }
}

const createBlog = async (req, res, next) => {
  const data = req.body

  try {
    const blog = await Blog.create(data)
    res.status(201).json({ status: 'success', data: { blog } })
  } catch (error) {
    next(error)
  }
}

const updateBlog = async (req, res, next) => {
  const { id } = req.params
  const data = req.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      context: 'query',
    })

    res.status(200).json({ status: 'message', data: { blog: updatedBlog } })
  } catch (error) {
    next(error)
  }
}

const deleteBlog = async (req, res, next) => {
  const { id } = req.params
  try {
    await Blog.findByIdAndDelete(id)
    res.status(204).json({ status: 'success', data: null })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
}
