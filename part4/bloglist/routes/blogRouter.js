const express = require('express')
const { getAllBlogs, createBlog } = require('../controllers/blogs.js')

const blogRouter = express.Router()

blogRouter.get('/', getAllBlogs)
blogRouter.post('/', createBlog)

module.exports = blogRouter
