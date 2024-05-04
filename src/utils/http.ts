import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'

// axios 基础封装
import axios, { AxiosError } from 'axios'
import { useUserStore } from '@/stores'

const httpInstance = axios.create({
  // 基地址
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  // 超时时间
  timeout: 5000
})

// 请求拦截
httpInstance.interceptors.request.use(
  (config) => {
    // 拼接 Bearer Token
    const userStore = useUserStore()
    if (userStore.userInfo?.token) {
      config.headers.Authorization = `Bearer ${userStore.userInfo.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 相应拦截
httpInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 统一错误提示
    ElMessage.warning({
      message: (error as AxiosError<{ code: string; message: string }>).response?.data.message
    })

    return Promise.reject(error.response?.data)
  }
)
export default httpInstance
