const express = require('express')
const {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController')
const { getTokenFrom, userExtractor } = require('../utils/middleware')

const blogsRouter = express.Router()

blogsRouter
  .route('/')
  .get(getBlogs)
  .post(getTokenFrom, userExtractor, createBlog)

blogsRouter
  .route('/:id')
  .get(getBlog)
  .put(updateBlog)
  .delete(getTokenFrom, deleteBlog)

module.exports = blogsRouter
