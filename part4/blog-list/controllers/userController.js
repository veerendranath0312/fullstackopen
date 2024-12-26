const bcrypt = require('bcrypt')
const User = require('../models/user')

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
    res.status(200).json({ status: 'success', data: { users } })
  } catch (error) {
    next(error)
  }
}

const createUser = async (req, res, next) => {
  try {
    const { username, name, password } = req.body

    if (!(password && password.length >= 3)) {
      throw new Error(
        'Missing password or length should be more than 3 characters'
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const createdUser = await User.create({
      username,
      name,
      passwordHash,
    })

    res.status(201).json({ status: 'success', data: { user: createdUser } })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllUsers, createUser }
