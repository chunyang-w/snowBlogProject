import axios from 'axios'
import config from '../../config/config'
import { message } from 'antd'
import store from '@client/store/index'
import { setLoginState } from '@client/store/adminLogin/adminLogin'

const API = {
  baseURL: (
    process.env.NODE_ENV === 'dev' ? config.server.devURL :
    process.env.NODE_ENV === 'test' ? config.server.testURL : 
    config.server.prodURL
  ) 
    + ':' +String(config.server.apiPort),
  timeout: '8000'
}

const herald = axios.create({
  baseURL: API.baseURL,
  timeout: API.timeout
})

herald.interceptors.request.use(
  config => {
    config.headers.authToken = store.getState().adminLogin.token
    config.headers.username= store.getState().adminLogin.username
    return config
  },
  err => {
    console.log('[herald] request failed:', err)
  }
)

herald.interceptors.response.use(
  res => {
    if (res.data.code === 1) {
      message.error(res.data.message)
    } else if (res.data.code === 2 | res.data.code === 3) {
      store.dispatch(setLoginState({
        username: '',
        needLogin: true,
        token: ''
      }))
      message.warning(res.data.message)
    } else if (res.data.code !== 0) {
      message.warning(res.data.message)
    }
    return res.data
  },
  err => {
    console.log('[herald] response failed:', err)
  }
)

export default herald