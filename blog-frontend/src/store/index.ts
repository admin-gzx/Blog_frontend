import { createPinia } from 'pinia'
import useAuthStore from './auth'

const pinia = createPinia()

// 导出store实例
export default pinia

// 导出store hooks
export { useAuthStore }