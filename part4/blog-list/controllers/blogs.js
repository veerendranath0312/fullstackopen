const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog.js')

// Get all blogs
const getAllBlogs = (req, res) => {
  Blog.find({}).then((blogs) => {
    res.status(200).json(blogs)
  })
}

// Create a blog
const createBlog = (req, res, next) => {
  const data = req.body
  const newBlog = new Blog(data)
  newBlog
    .save()
    .then((savedBlog) => res.status(201).json(savedBlog))
    .catch((error) => next(error))
}

blogsRouter.route('/').get(getAllBlogs).post(createBlog)

module.exports = blogsRouter
