import api from './api'
import type { User } from '@/types'

// 登录请求参数类型
interface LoginRequest {
  username: string
  password: string
}

// 登录响应数据类型
interface LoginResponse {
  token: string
  user: User
}

// 注册请求参数类型
interface RegisterRequest {
  username: string
  email: string
  nickname: string
  password: string
}

// 注册响应数据类型
interface RegisterResponse extends User {}

// 登录API
export const login = (data: LoginRequest): Promise<{ data: LoginResponse }> => {
  return api.post('/auth/login', data)
}

// 注册API
export const register = (data: RegisterRequest): Promise<{ data: RegisterResponse }> => {
  return api.post('/auth/register', data)
}