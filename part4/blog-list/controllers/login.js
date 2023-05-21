const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user.js')

const loginRouter = express.Router()

loginRouter.post('/login', async (req, res) => {
  const { username, password } = req.body

  // check if username and password exists
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }

  // check if user exists
  const foundUser = await User.findOne({ username })
  if (!foundUser) {
    return res.status(400).json({ error: 'User not found' })
  }

  // compare the password with the hashed password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    foundUser.passwordHash
  )
  if (!isPasswordCorrect) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }

  // create the payload to generate token
  const payload = {
    user: {
      id: foundUser.id,
      username: foundUser.username,
    },
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  })

  res.status(200).json({
    message: 'Login successful',
    user: { id: foundUser.id, username: foundUser.username },
    token,
  })
})

module.exports = loginRouter
