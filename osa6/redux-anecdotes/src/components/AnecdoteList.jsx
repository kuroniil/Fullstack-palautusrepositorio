import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  var anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
        return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
})

  const dispatch = useDispatch()

  const sortAnecdotes = () => {
    anecdotes = anecdotes.sort((a, b) => (a.votes < b.votes) ? 1 : (a.votes > b.votes) ? -1 : 0)
  }

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    console.log('vote', id)
  }

  return (
    <div>
    {sortAnecdotes()}
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}

export default AnecdoteList