import { createSlice } from '@reduxjs/toolkit'

export const windowSlice = createSlice({
  name: 'window',
  initialState: {
    deviceType: 'client'
  },
  reducers: {
    setDeviceType(state, action) {
      state.deviceType= action.payload
    }
  }
})

export const { setDeviceType } = windowSlice.actions

export default windowSlice.reducer