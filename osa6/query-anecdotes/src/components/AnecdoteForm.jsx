import { useContext } from 'react'
import NotificationContext from '../notificationContext'

const AnecdoteForm = ({ newAnecdoteMutation }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length > 4) {
      newAnecdoteMutation.mutate({'content': content, 'id': getId(), 'votes': 0})
    } else {
      notificationDispatch({ type: "BAD_ANECDOTE" })
      setTimeout(() => {
        notificationDispatch({ type: "NULL"})
      }, 5000)
  }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
