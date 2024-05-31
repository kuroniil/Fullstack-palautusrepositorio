import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    if (state.notification.length !== 0) {return state.notification} else { return '' }
    })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification !== '') {
  return (
    <div style={style}>

      {notification}
    </div>
  )
} else {
  return 
}
}

export default Notification