import store from './store/index'
import { setDeviceType } from './store/window/windowReducer'
import { browserWindow } from '../config/config'

//============================================================
console.log('global.js loaded')
//============================================================

store.dispatch(setDeviceType(
  window.innerWidth < browserWindow.limit ? 'mobile' : 'client'
))

window.addEventListener('resize', () => {
  if (window.innerWidth < browserWindow.limit) {
    store.dispatch(setDeviceType('mobile'))
  } else {
    store.dispatch(setDeviceType('client'))
  }
})