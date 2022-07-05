const Blog = require('../models/blog.js')

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
}

const createBlog = async (req, res, next) => {
  const data = req.body

  const newBlog = Blog({
    title: data.title,
    author: data.author,
    url: data.url,
    likes: data.likes
  })

  try {
    const savedBlog = await newBlog.save()
    res.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
}

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

const updateBlog = async (req, res, next) => {
  try {
    const data = req.body
    const { id } = req.params

    const newBlogObject = {
      title: data.title,
      author: data.author,
      url: data.url,
      likes: data.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlogObject, {
      new: true
    })
    res.json(updatedBlog)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog
}
