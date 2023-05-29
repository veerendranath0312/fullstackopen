import React from 'react'
import Blog from './components/Blog'
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

  React.useEffect(() => {
    if (user !== null) {
      blogService.getAllBlogs().then((response) => {
        setBlogs(response)
      })
    }
  }, [user])

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
      blogService.setToken(user.token)

      // set the user info
      setUser(user)

      // empty the username and password after login
      setLoginDetails({ username: '', password: '' })
    } catch (error) {
      console.log('Error: ', error.response.data.error)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <h4>{user.user.username} logged in</h4>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
