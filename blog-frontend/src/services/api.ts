import axios from 'axios'
import { ElMessage } from 'element-plus'
import config from '@/config'

const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      // 验证JWT令牌格式是否正确（包含两个点号）
      if (token.split('.').length === 3) {
        config.headers.Authorization = `Bearer ${token}`
      } else {
        // 如果令牌格式不正确，清除它
        localStorage.removeItem('token')
        console.warn('Invalid JWT token format, token removed from localStorage')
      }
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // 处理未授权错误
      localStorage.removeItem('token')
      window.location.href = '/login'
      ElMessage.error('登录已过期，请重新登录')
    } else if (error.response?.status === 403) {
      // 处理权限不足错误
      ElMessage.error('权限不足')
    } else if (error.response?.status === 404) {
      // 处理资源不存在错误
      ElMessage.error('请求的资源不存在')
    } else if (error.response?.status >= 500) {
      // 处理服务器错误
      ElMessage.error('服务器内部错误')
    } else {
      // 其他错误
      console.error('API Error:', error)
      ElMessage.error(error.response?.data?.message || '请求失败')
    }
    return Promise.reject(error)
  }
)

export default api