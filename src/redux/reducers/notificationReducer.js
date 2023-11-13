import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  isError: false,
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addMessage: (_state, action) => {
      return action.payload
    },
    removeMessage: (_state, _action) => {
      return initialState
    },
  },
})

export const { addMessage, removeMessage } = notificationSlice.actions
//action creators
let timeoutId = null
export const showNotification = (notification, duration) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(addMessage(notification))
    timeoutId = setTimeout(() => {
      dispatch(removeMessage())
    }, duration * 1000)
  }
}
export default notificationSlice.reducer
