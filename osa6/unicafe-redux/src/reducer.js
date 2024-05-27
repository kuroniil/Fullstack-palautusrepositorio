<const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      var updatedState = {...state, good: state.good + 1}
      return updatedState
    case 'OK':
      var updatedState = {...state, ok: state.ok + 1}
      return updatedState
    case 'BAD':
      var updatedState = {...state, bad: state.bad + 1}
      return updatedState
    case 'ZERO':
      var updatedState = {...state, bad: 0, good: 0, ok: 0}
      return updatedState
    default: return state
  }
  
}

export default counterReducer
