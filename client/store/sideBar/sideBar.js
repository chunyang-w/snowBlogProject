import { createSlice } from '@reduxjs/toolkit'

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState: {
    tag: '',
    search: ''
  },
  reducers: {
    setTag(state, action) {
      state.tag = action.payload
    },
    setSearch(state, action) {
      state.search = action.payload
    },
  }
})

export const {
  setTag,
  setSearch
} = sideBarSlice.actions

export default sideBarSlice.reducer