const globalErrorHandler = (error, req, res, next) => {
  console.log(error.message)

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

module.exports = { globalErrorHandler }
