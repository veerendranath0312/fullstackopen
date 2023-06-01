import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

function App() {
  const [blogs, setBlogs] = React.useState([])
  const [user, setUser] = React.useState(null)
  const [loginDetails, setLoginDetails] = React.useState({
    username: '',
    password: '',
  })

  const [notification, setNotification] = React.useState(null)
  const blogFormref = React.useRef()

  React.useEffect(() => {
    if (user !== null) {
      blogService.getAllBlogs().then((response) => {
        setBlogs(response)
      })
    }
  }, [user])

  React.useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLoginDetails = (event) => {
    setLoginDetails((prevLoginDetails) => {
      return {
        ...prevLoginDetails,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // login and get the token
      const user = await loginService.login(loginDetails)

      // save the token for other api requests
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      // set the user info
      setUser(user)

      // empty the username and password after login
      setLoginDetails({ username: '', password: '' })
    } catch (error) {
      console.log('Error: ', error.response.data.error)
      setNotification({
        status: 'failed',
        message: error.response.data.error,
      })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleLogout = () => {
    // remove token from local storage
    window.localStorage.removeItem('loggedUser')

    // set the user to null
    setUser(null)
  }

  const saveBlog = async (blogDetails) => {
    const savedBlog = await blogService.createBlog(blogDetails)
    setBlogs((prevBlogs) => [...prevBlogs, savedBlog])

    setNotification({
      status: 'success',
      message: `a new blog ${blogDetails.title} by ${blogDetails.author} added`,
    })
    setTimeout(() => setNotification(null), 3000)

    blogFormref.current.toggleVisibility()
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username: &nbsp;
            <input
              type="text"
              name="username"
              value={loginDetails.username}
              onChange={handleLoginDetails}
            />
          </div>
          <br />
          <div>
            password: &nbsp;
            <input
              type="password"
              name="password"
              value={loginDetails.password}
              onChange={handleLoginDetails}
            />
          </div>
          <br />
          <button>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <h4>
        {user.user.username} logged in{' '}
        <button className="logout-btn" onClick={handleLogout}>
          logout
        </button>
      </h4>

      <Togglable ref={blogFormref}>
        <BlogForm createBlog={saveBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
