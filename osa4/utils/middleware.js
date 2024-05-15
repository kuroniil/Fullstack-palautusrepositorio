const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  request.token = null
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
    }
  next()
  }

const userExtractor = async (request, response, next) => {
  request.user = null
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  } else {
    request.user = await User.findById(decodedToken.id)
  }
  next()
}

module.exports = {tokenExtractor, userExtractor}