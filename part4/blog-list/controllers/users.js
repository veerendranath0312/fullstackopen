const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user.js')

const usersRouter = express.Router()

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })
  res.status(200).json(users)
}

const createUser = async (req, res, next) => {
  const { username, password, name } = req.body

  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: 'Password should be minimum of 3 chars long' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    passwordHash,
    name,
  })

  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
}

usersRouter.route('/').get(getAllUsers).post(createUser)

module.exports = usersRouter
