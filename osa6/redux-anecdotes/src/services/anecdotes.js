import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const updateVotes = async (id) => {
  const anecdotes = await getAll()
  const target = anecdotes.find(a => a.id === id)
  target.votes += 1
  const response = await axios.put(`http://localhost:3001/anecdotes/${id}`, target)
  return response.data
}

export default { getAll, createNew, updateVotes }