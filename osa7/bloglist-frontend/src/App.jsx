import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Header from './components/Header'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { setNotificationType } from './reducers/notificationTypeReducer'
import { useDispatch } from 'react-redux'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('error')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotificationType('error'))
      dispatch(setNotification('wrong username or password'))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLikeClick = async (blog) => {
    const id = blog.id
    blog.likes = blog.likes + 1
    const response = await blogService.updateBlog(blog)
    const index = blogs.findIndex(blog => blog.id === id)
    const updatedBlogs = [...blogs]
    updatedBlogs[index].likes = blog.likes
    setBlogs(updatedBlogs)
  }


  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = await blogService.newBlog(blogTitle, blogAuthor, blogUrl, user.token)
    setBlogs(blogs.concat(newBlog))
    dispatch(setNotificationType('success'))
    dispatch(setNotification(`a new blog ${blogTitle} by ${blogAuthor} added`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
    setBlogAuthor('')
    setBlogTitle('')
    setBlogUrl('')
  }

  const handleRemoveClick = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const response = await blogService.deleteBlog(blogId, user.token)
      const updatedBlogs = blogs.filter(blog => blog.id !== blogId)
      setBlogs(updatedBlogs)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  if (user) {
    return (
      <div>
        <Notification />
        <Header user={user} />
        <p>{user.name} logged in <button onClick={logout}>logout</button></p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <NewBlogForm handleNewBlog={handleNewBlog} blogTitle={blogTitle}
            blogAuthor={blogAuthor} blogUrl={blogUrl} setBlogAuthor={setBlogAuthor}
            setBlogTitle={setBlogTitle} setBlogUrl={setBlogUrl}/>
        </Togglable>
        <br></br>
        {blogs.map(blog =>
          <div key={blog.id}>
            <Blog blog={blog} handleLikeClick={handleLikeClick} sessionUser={user} handleRemoveClick={handleRemoveClick} />
          </div>
        )}
        {!user && loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <Header user={user} />
        {!user && loginForm()}
      </div>
    )
  }
}
export default App