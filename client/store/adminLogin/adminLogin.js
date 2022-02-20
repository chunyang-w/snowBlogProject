import { createSlice } from '@reduxjs/toolkit'

export const adminLoginSlice = createSlice({
  name: 'adminLogin',
  initialState: {
    needLogin: false,
    token: '',
    username: ''
  },
  reducers: {
    setLoginState(state, action) {
      state.needLogin = action.payload.needLogin
      state.token = action.payload.token
      state.username = action.payload.username
    },
    setToken(state, action) {
      state.token = action.payload
    },
    setNeedLogin(state, action) {
      state.needLogin = action.payload
    },
    setUsername(state, action) {
      state.username = action.username
    }
  }
})

export const {
  setLoginState,
  setNeedLogin,
  setToken,
  setUsername
} = adminLoginSlice.actions

export default adminLoginSlice.reducer