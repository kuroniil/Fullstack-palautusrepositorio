const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const listHelper = require('../utils/list_helper')
const usersHelper = require('../utils/users_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(listHelper.blogs)

  await User.deleteMany({})
  await User.insertMany(usersHelper.users)
})


test('blogs are returned as json and correct number of blogs', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .then(result => {
        assert.strictEqual(result.body.length, listHelper.blogs.length)
    })
    })

test('Blogs are identified by id', async () => {
  await api
    .get('/api/blogs')
    .then(result => {
        const _ids = result.body.map(blog => blog._id)
        const ids = result.body.map(blog => blog.id)
        
        const test_ids = Array(listHelper.blogs.length).fill(undefined)
        const testIds = ids.every(id => id !== undefined)

        assert.deepStrictEqual(_ids, test_ids)
        assert.deepStrictEqual(testIds, true)
    })
    })

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Blog 4',
    author: 'Jari',
    url: 'www.osoite.com',
    likes: 4,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', bearer)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, listHelper.blogs.length + 1)
})

test('blog with no likes set is added', async () => {
  const newBlog = {
    title: 'Blog 4',
    author: 'Jari',
    url: 'www.osoite.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body[response.body.length - 1].likes, 0)
})

test('blog with no url set is added', async () => {
  const newBlog = {
    title: 'Blog 5',
    author: 'Aki',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blog with no title set is added', async () => {
  const newBlog = {
    author: 'aaa',
    likes: 21,
    url: 'www.osoite.osoite',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blog deletion', async () => {
  const blogsAtStart = await listHelper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAtEnd = await listHelper.blogsInDb()
  const titles = blogsAtEnd.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, listHelper.blogs.length - 1)
})

test('editing a blog', async () => {
  const blogsAtStart = await listHelper.blogsInDb()
  const blogToEdit = blogsAtStart[0]
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 99
  }
  
  await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(newBlog)
  
  const blogsAtEnd = await listHelper.blogsInDb()
  const editedBlog = blogsAtEnd[0]
  
  assert(editedBlog.likes !== blogToEdit.likes)
})

describe('User creation tests', () => {

  test('password of length < 3', async () => {
    const newUser = {
      username: "tapio16",
      name: "tapio",
      password: "12"
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await usersHelper.usersInDb()
    assert(result.body.error.includes('password was shorter than 3 characters'))
    assert.strictEqual(usersHelper.users.length, usersAtEnd.length)
  })

  test('no password given', async () => {
    const newUser = {
      username: "lapiotapio",
      name: "tapio"
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await usersHelper.usersInDb()
    
    assert(result.body.error.includes('password was shorter than 3 characters'))
    assert.strictEqual(usersHelper.users.length, usersAtEnd.length)
  })

  test('username already in database', async () => {
    const newUser = {
      username: "ariP",
      name: "ari",
      password: "1234"
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await usersHelper.usersInDb()
    assert(result.body.error.includes('username is already taken'))    
    assert.strictEqual(usersHelper.users.length, usersAtEnd.length)
  })
})


after(async () => {
  await mongoose.connection.close()
})
