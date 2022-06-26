const Blog = require('../models/blog.js')

const getAllBlogs = (req, res) => {
  Blog.find({}).then(blogs => res.json(blogs))
}

const createBlog = (req, res, next) => {
  const data = req.body

  const newBlog = Blog({
    title: data.title,
    author: data.author,
    url: data.url,
    likes: data.likes
  })

  newBlog
    .save()
    .then(savedBlog => res.status(201).json(savedBlog))
    .catch(error => next(error))
}

module.exports = {
  getAllBlogs,
  createBlog
}
