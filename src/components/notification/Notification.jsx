import { useSelector } from 'react-redux'
import './notification.css'

function Notification() {
  const notification = useSelector(state => state.notification)
  return (
    <div className={notification.isError ? 'error' : 'success'}>
      <p>{notification.message}</p>
    </div>
  )
}
export default Notification