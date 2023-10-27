import { useState, useEffect } from 'react'
import Blog from './components/blog/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/notification/Notification'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [showBlogForm, setShowBlogForm] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const userCredentials = { username, password }
    try {
      const response = await loginService.login(userCredentials)
      setUser(response)
      blogService.setToken(response.token)
      window.localStorage.setItem('user', JSON.stringify(response))
    } catch (error) {
      setMessage('wrong username or password')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleOnChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value)
    }
    else {
      setPassword(e.target.value)
    }
   
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleCreateNewBlog = async (newBlog) => {
    try {
      const response = await blogService.postBlog(newBlog)
      setBlogs([...blogs, response])
      setMessage(`a new blog ${response.title} by ${response.author} added`)
      setIsError(false)
      setShowBlogForm(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    } catch (error) {
      setMessage('blog could not be added')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  return (
    <div>
      {!user ?
        <LoginForm handleLogin={handleLogin} handleOnChange={handleOnChange} message={message} isError={isError} />
        :
        <div>
          <h2>blogs</h2>
          {message && <Notification message={message} isError={isError} />}
          <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          {showBlogForm?<NewBlogForm handleCreateNewBlog={handleCreateNewBlog} setShowBlogForm={setShowBlogForm}/> : 
          <button onClick={()=>setShowBlogForm(true)}>new Blog</button>}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} username={user.name}/>
          )}
        </div>
      }


    </div>
  )
}

export default App