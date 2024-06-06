import { createSlice } from '@reduxjs/toolkit'

const notificationTypeSlice = createSlice({
  name: 'notificationType',
  initialState: [],
  reducers: {
    setType (state, action) {
      state.push(action.payload)
      return state
    },
    resetType (state, action) {
      return []
    }
  }
})

export const { setType, resetType } = notificationTypeSlice.actions

export const setNotificationType = (type) => {
  return async dispatch => {
    await dispatch(setType(type))
    setTimeout(() => {
      dispatch(resetType())
    }, 5010)
  }
}

export default notificationTypeSlice.reducer