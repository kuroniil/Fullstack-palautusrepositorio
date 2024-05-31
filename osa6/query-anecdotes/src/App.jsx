import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote, getAnecdotes, updateAnecdote } from './requests'

import { useReducer } from 'react'
import NotificationContext from './notificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NULL":
      return null
    case "VOTE":
      return `Anecdote '${action.payload}' voted`
    case "NEW_ANECDOTE":
      return 'New anecdote created'
    case "BAD_ANECDOTE":
      return 'too short anecdote, must have length 5 or more'
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      notificationDispatch({ type: "NEW_ANECDOTE" })
      setTimeout(() => {
        notificationDispatch({ type: "NULL" })
      }, 5000)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })


  const handleVote = (anecdote) => {
    notificationDispatch({ type: "VOTE", payload: anecdote.content })
    setTimeout(() => {
      notificationDispatch({ type: "NULL" })
    }, 5000)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError === true ) {
    return <div>anecdote server not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
  <NotificationContext.Provider value={[notification, notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider> 
  )
}

export default App
