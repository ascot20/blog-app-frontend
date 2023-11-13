import { useState, useEffect } from 'react'
import Blog from './components/blog/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/notification/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './redux/reducers/notificationReducer'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showBlogForm, setShowBlogForm] = useState(true)
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes - b.likes))
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
      const notification = {
        message: 'wrong username or password',
        isError: true
      }
      dispatch(showNotification(notification, 5))
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
      const notification = {
        message: `a new blog ${response.title} by ${response.author} added`,
        isError: false
      }
      dispatch(showNotification(notification, 5))
    } catch (error) {
      const notification = {
        message: 'blog could not be added',
        isError: true
      }
      dispatch(showNotification(notification, 5))
    }
  }

  const likeBlog = async (id) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    const updateLikes = { likes: blogToUpdate.likes + 1 }
    const response = await blogService.updateBlog(id, updateLikes)
    const updatedBlogs = blogs.map(blog => blog.id === id ? response : blog)
    setBlogs(updatedBlogs)
  }

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find(blog => blog.id === id)
    try {
      await blogService.deleteBlog(blogToRemove.id)
      const updatedBlogs = blogs.filter(blog => blog.id !== blogToRemove.id)
      setBlogs(updatedBlogs)
      const notification = {
        message: 'blog deleted successfully',
        isError: false
      }
      dispatch(showNotification(notification, 5))
    } catch (error) {
      const notification = {
        message: 'blog could not be deleted',
        isError: true
      }
      dispatch(showNotification(notification, 5))
    }
  }

  return (
    <div>
      {!user ?
        <LoginForm handleLogin={handleLogin} handleOnChange={handleOnChange}/>
        :
        <div>
          <h2>blogs</h2>
          {notification.message && <Notification/>}
          <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          {showBlogForm ? <NewBlogForm handleCreateNewBlog={handleCreateNewBlog} setShowBlogForm={setShowBlogForm} /> :
            <button onClick={() => setShowBlogForm(true)}>new Blog</button>}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} username={user.name} likeBlog={likeBlog} removeBlog={removeBlog} />
          )}
        </div>
      }


    </div>
  )
}

export default App