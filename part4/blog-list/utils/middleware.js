const jwt = require('jsonwebtoken')
const User = require('../models/user')

const globalErrorHandler = (error, req, res, next) => {
  console.log('Error: ', error.message)

  if (error.name === 'CastError') {
    return res.status(400).json({ status: 'fail', message: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ status: 'fail', message: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ status: 'fail', message: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ status: 'fail', message: 'token expired' })
  }

  next(error)
}

const getTokenFrom = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (!(authorization && authorization.startsWith('Bearer '))) {
    return res.status(401).json({ status: 'fail', message: 'Invaild token' })
  }

  const extractedToken = authorization.replace('Bearer ', '')
  const decodedToken = jwt.verify(extractedToken, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ status: 'fail', message: 'Invaild token' })
  }

  req.decodedToken = decodedToken
  next()
}

const userExtractor = async (req, res, next) => {
  const user = await User.findById(req.decodedToken.id)
  req.user = user
  next()
}

module.exports = { globalErrorHandler, getTokenFrom, userExtractor }
