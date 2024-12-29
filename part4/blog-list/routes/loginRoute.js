const express = require('express')
const loginRouter = express.Router()
const login = require('../controllers/loginController')

loginRouter.route('/').post(login)

module.exports = loginRouter
