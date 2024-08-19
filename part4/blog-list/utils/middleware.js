const globalErrorHandler = (error, req, res, next) => {
  console.log(error.message)

  res.status(400).json({
    status: 'fail',
    message: error.message,
  })
}

module.exports = { globalErrorHandler }
