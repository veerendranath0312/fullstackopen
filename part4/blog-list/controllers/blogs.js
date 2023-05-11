const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog.js')

// Get all blogs
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({})
  res.status(200).json(blogs)
}

// Create a blog
const createBlog = async (req, res, next) => {
  const data = req.body
  const newBlog = new Blog(data)

  try {
    const savedBlog = await newBlog.save()
    res.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
}

blogsRouter.route('/').get(getAllBlogs).post(createBlog)

module.exports = blogsRouter
