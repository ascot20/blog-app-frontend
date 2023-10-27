import { useState } from "react"
import Notification from "./notification/Notification"

function LoginForm({handleLogin, handleOnChange, message, isError}) {

  return (
    <div>
        <h2>login to application</h2>
        {message && <Notification message={message} isError={isError}/>}
        <form onSubmit={handleLogin}>
            <div>
            <label htmlFor="username">username</label>
            <input name="username" type="text" onChange={handleOnChange}/>
            </div>
            <div>
            <label htmlFor="password">password</label>
            <input name="password" type="password" onChange={handleOnChange}/>
            </div>
            <button type="submit">login</button>
        </form>
    </div>
  )
}
export default LoginForm