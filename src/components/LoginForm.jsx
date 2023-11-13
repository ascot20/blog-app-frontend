import Notification from './notification/Notification'
import { useSelector } from 'react-redux'

function LoginForm({ handleLogin, handleOnChange }) {
  const notification = useSelector(state => state.notification)
  return (
    <div>
      <h2>login to application</h2>
      {notification.message && <Notification/>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input name="username" type="text" onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input name="password" type="password" onChange={handleOnChange} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
export default LoginForm