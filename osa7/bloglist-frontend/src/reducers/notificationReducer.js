import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    setMessage (state, action) {
      state.push(action.payload)
      return state
    },
    removeMessage (state, action) {
      return []
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (content) => {
  return async dispatch => {
    await dispatch(setMessage(content))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }
}

export default notificationSlice.reducer