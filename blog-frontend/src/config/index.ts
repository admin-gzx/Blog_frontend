// 环境配置
interface Config {
  apiBaseUrl: string
}

// 根据环境变量设置API基础URL
const getConfig = (): Config => {
  const env = import.meta.env.MODE || 'development'

  switch (env) {
    case 'production':
      return {
        apiBaseUrl: 'https://your-production-api.com'  // 移除了重复的 /api
      }
    case 'development':
    default:
      return {
        apiBaseUrl: 'http://localhost:8080'  // 移除了重复的 /api
      }
  }
}

const config = getConfig()

export default config