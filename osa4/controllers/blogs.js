const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const users = require('./users')
const jwt = require('jsonwebtoken')
const { error } = require('../utils/logger')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', {username: 1, name: 1})
    
    response.json(blogs)
    })
  
  blogsRouter.post('/', userExtractor, async (request, response, next) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes,
      user: user.id
    })

    if (blog.likes === undefined) {
      blog.likes = 0
    }
        
    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    } catch(error) {
      response.status(400).send({error: 'bad request'})
      next(error)
    }

  })  

  blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const id = request.params.id
    const userId = request.user.id
    const blog = await Blog.findById(id)
    if (blog.user.toString() === userId.toString()) {
      await Blog.findByIdAndDelete(id)
      response.status(204).end()
    } else {
      response.status(400).send({error: 'incorrect token'})
    }
  })

  blogsRouter.put('/:id', async ( request, response) => {
    const body = request.body

    const newBlog = {
      title: body.title,
      url: body.url,
      likes: body.likes,
      author: body.author,
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog)
    response.json(updatedBlog)
  })

module.exports = blogsRouter