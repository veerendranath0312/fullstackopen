const express = require('express')
const {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController')

const blogsRouter = express.Router()

blogsRouter.route('/').get(getBlogs).post(createBlog)
blogsRouter.route('/:id').get(getBlog).put(updateBlog).delete(deleteBlog)

module.exports = blogsRouter
