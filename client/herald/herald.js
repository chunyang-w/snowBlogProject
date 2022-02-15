import axios from 'axios'
import config from '../../config/config'

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
    return config
  },
  err => {
    console.log('[herald] request failed:', err)
  }
)

herald.interceptors.response.use(
  res => {
    return res
  },
  err => {
    console.log('[herald] response failed:', err)
  }
)

export default herald