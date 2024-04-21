// axios 基础封装
import axios from 'axios'

const httpInstance = axios.create({
  // 基地址
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  // 超时时间
  timeout: 5000
})

// 请求拦截
httpInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// 相应拦截
httpInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)
export default httpInstance
