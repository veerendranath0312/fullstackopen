const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

// Get all blogs related to a user
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({ user: req.user.id }).populate('user', {
    username: 1,
    name: 1,
  })
  res.status(200).json(blogs)
}

// Create a blog
const createBlog = async (req, res, next) => {
  const data = req.body
  const newBlog = new Blog({ ...data, user: req.user.id })

  try {
    const savedBlog = await newBlog.save()

    // We will assign user to the req after a successful token verification
    const user = await User.findById(req.user.id)
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

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
    const blog = await Blog.findById(id)
    if (blog.user.toString() === req.user.id) {
      await Blog.findByIdAndRemove(id)
      res.status(204).end()
    } else {
      res
        .status(401)
        .json({ error: 'User is not authorized to perform the operation' })
    }
  } catch (error) {
    next(error)
  }
}

blogsRouter.route('/').get(getAllBlogs).post(createBlog)
blogsRouter.route('/:id').put(updateBlog).delete(deleteBlog)

module.exports = blogsRouter
