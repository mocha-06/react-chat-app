import { createSlice } from '@reduxjs/toolkit'
// できればconfigureStoreを使用
import { InitialUserState } from '../Types'

const initialState: InitialUserState = {
  user: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})
// console.log(userSlice)

export const { login, logout } = userSlice.actions
export default userSlice.reducer