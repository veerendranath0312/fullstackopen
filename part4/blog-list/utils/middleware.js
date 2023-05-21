const unknownRequest = (req, res) => {
  res.status(404).json({
    msg: '404 Bad Request!',
  })
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    const { username } = error.errors
    if (username) {
      return res.status(400).json({
        error: 'The username must be unique with a min of 3 characters long',
      })
    }
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = { unknownRequest, errorHandler }
