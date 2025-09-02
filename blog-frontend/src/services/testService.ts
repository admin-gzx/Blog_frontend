import api from './api'

// 公共测试接口响应类型
interface TestResponse {
  message: string
}

// 公共测试接口
export const testPublic = () => {
  return api.get<TestResponse>('/api/test/all')
}

// 用户测试接口
export const testUser = () => {
  return api.get<TestResponse>('/api/test/user')
}

// 管理员测试接口
export const testAdmin = () => {
  return api.get<TestResponse>('/api/test/admin')
}