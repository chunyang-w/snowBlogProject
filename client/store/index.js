import { configureStore } from '@reduxjs/toolkit'
import windowReducer from './window/windowReducer'

export default configureStore({
  reducer: {
    window: windowReducer
  },
})