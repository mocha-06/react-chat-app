import { configureStore } from '@reduxjs/toolkit'
import useReducer from '../features/userSlice'
import channelReducer from '../features/channelSlice'

export const store = configureStore({
  reducer: {
    user: useReducer,
    channel: channelReducer,
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>