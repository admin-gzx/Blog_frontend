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
        apiBaseUrl: 'https://your-production-api.com'
      }
    case 'development':
    default:
      return {
        apiBaseUrl: 'http://localhost:8080'
      }
  }
}

const config = getConfig()

export default config