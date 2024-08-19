const Blog = require('../models/blog')

// Using JSend specification to send the response
// JSend is a specification for a simple, no-frills, JSON based format for application-level communication.

const getBlogs = (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.status(200).json({
        status: 'success',
        results: blogs.length,
        data: { blogs },
      })
    })
    .catch((error) => next(error))
}

const getBlog = (req, res, next) => {}

const createBlog = (req, res, next) => {
  const body = req.body

  Blog.create(body)
    .then((blog) =>
      res.status(201).json({
        status: 'success',
        data: { blog },
      })
    )
    .catch((error) => next(error))
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
