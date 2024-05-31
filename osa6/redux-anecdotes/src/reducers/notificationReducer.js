import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    setMessage(state, action) {
      const content = action.payload
      state.push(`You voted '${content}'`)
      return state
    },
    removeMessage(state, action) {
        return []
    }
  }
  
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async dispatch => {
    await dispatch(setMessage(content))
    setTimeout(() => {
      dispatch(removeMessage())
    }, time*1000)
  }
}

export default notificationSlice.reducer
