import './notification.css'

function Notification({message, isError}) {
  return (
    <div className={isError?'error':'success'}>
        <p>{message}</p>
    </div>
  )
}
export default Notification