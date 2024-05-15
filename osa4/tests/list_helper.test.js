const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = listHelper.blogs

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has many blogs', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })

})

describe ('favorite blog', () => {

  test('when list has many blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result, blogs[2])
  })
})

describe ('most blogs', () => {

  test('when list has many blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {author: blogs[3].author, blogs: 3})
  })

describe ('most likes', () => {

  test('when list has many blogs', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {author: "Edsger W. Dijkstra", likes: 17})
  })
})
  
})