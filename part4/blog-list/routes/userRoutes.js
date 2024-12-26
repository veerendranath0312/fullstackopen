const express = require('express')
const { createUser, getAllUsers } = require('../controllers/userController')

const userRouter = express.Router()

userRouter.route('/').get(getAllUsers).post(createUser)

module.exports = userRouter
