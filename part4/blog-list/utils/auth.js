const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ error: 'Unauthorized request' })
  }

  const token = req.headers['authorization'].split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' })
  }
}

module.exports = validateToken
