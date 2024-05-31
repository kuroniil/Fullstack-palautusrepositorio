import { useContext } from 'react'
import NotificationContext from '../notificationContext'

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification === null) {
    return null
  } else {
    return (
      <div style={style}>
        {notification}     
      </div>
    )
  }
}
export default Notification
