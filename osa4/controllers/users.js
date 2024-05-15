const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const usernameCheck = async (username) => {
  const users = await User.find({})
  return users.map(user => user.username).includes(username)
}

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password === undefined || password.length < 3) {
    response.status(400).json({error: 'password was shorter than 3 characters'})

  } else if (await usernameCheck(username)) {
    response.status(400).json({error: 'username is already taken'})

  } else {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
}
})
  
usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs', {url: 1, title: 1, author: 1, likes: 1})
  response.json(users)
})

module.exports = usersRouter