const logger = require('./logger.js')

const errorHandler = (error, req, res, next) => {
  logger.error(error.name)

  if (error.name === 'ValidationError') {
    res.status(400).json({
      error: error.message
    })
  } else if (error.name === 'CastError') {
    res.status(400).json({
      error: error.message
    })
  }

  next(error)
}

module.exports = { errorHandler }
