const { test, expect, beforeEach, describe } = require('@playwright/test')
const exp = require('constants')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', {name: 'login'})).toBeVisible()
  })
})

describe('Login', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http:localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
          }
        })
        await page.goto('http://localhost:5173')
      })
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')

        await page.getByRole('button', { name: 'login' }).click()
    
        await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('epäsalainen')

        await page.getByRole('button', { name: 'login' }).click()
    
        await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })

  describe('When logged in', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http:localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
          }
        })
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Kay Ttaja 2',
            username: 'kayttaja2',
            password: 'salattu'
          }
        })
        await page.goto('http://localhost:5173')
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')

        await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByPlaceholder('write title here').fill('testing blog')
      await page.getByPlaceholder('write author here').fill('Edsger W. Dijkstra')
      await page.getByPlaceholder('write url here').fill('www.blogtest.com')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('new blog testing blog by Edsger W. Dijkstra added')).toBeVisible()
    })
  

  test('a blog can be liked', async ({ page }) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByPlaceholder('write title here').fill('testing blog')
    await page.getByPlaceholder('write author here').fill('Edsger W. Dijkstra')
    await page.getByPlaceholder('write url here').fill('www.blogtest.com')
    await page.getByRole('button', { name: 'create' }).click()
      
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByText('likes 0')).toBeVisible()
    await page.getByRole('button', { name: 'like' }).click()
    await expect(page.getByText('likes 1')).toBeVisible()
  })

  test('a blog can be deleted', async ({ page }) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByPlaceholder('write title here').fill('testing blog')
    await page.getByPlaceholder('write author here').fill('Edsger W. Dijkstra')
    await page.getByPlaceholder('write url here').fill('www.blogtest.com')
    await page.getByRole('button', { name: 'create' }).click()

    await expect(page.getByText('testing blog Edsger W. Dijkstra')).toBeVisible()
    await page.getByRole('button', { name: 'view' }).click()
    
    
    page.on('dialog', dialog => dialog.accept())  
    await page.getByRole('button', { name: 'remove' }).click()
    await page.waitForSelector('text="a new blog testing blog by Edsger W. Dijkstra added"', { state: 'visible' })
    await page.waitForSelector('text="a new blog testing blog by Edsger W. Dijkstra added"', { state: 'hidden' })
    await expect(page.getByText('testing blog')).not.toBeVisible()
  })

  test('only the user that added the blog can see the remove button', async ({ page }) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByPlaceholder('write title here').fill('testing blog')
    await page.getByPlaceholder('write author here').fill('Edsger W. Dijkstra')
    await page.getByPlaceholder('write url here').fill('www.blogtest.com')
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

    await page.getByRole('button', { name: 'logout' }).click()
    await page.getByTestId('username').fill('kayttaja2')
    await page.getByTestId('password').fill('salattu')
    await page.getByRole('button', { name: 'login' }).click()

    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
  })

})