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

// Update a blog
const updateBlog = async (req, res, next) => {
  const { id } = req.params
  const data = req.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      context: 'query',
    })
    if (updatedBlog) {
      res.status(200).json(updatedBlog)
    } else {
      res.status(404).json({
        msg: 'blog you are trying to update is not found',
      })
    }
  } catch (error) {
    next(error)
  }
}

// Delete a blog
const deleteBlog = async (req, res, next) => {
  const { id } = req.params

  try {
    await Blog.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

blogsRouter.route('/').get(getAllBlogs).post(createBlog)
blogsRouter.route('/:id').put(updateBlog).delete(deleteBlog)

module.exports = blogsRouter
