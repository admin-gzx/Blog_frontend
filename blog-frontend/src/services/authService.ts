import api from './api'
import type { User } from '@/types'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/auth'



// 登录API
export const login = (data: LoginRequest): Promise<{ data: LoginResponse }> => {
  return api.post('/api/auth/signin', data)
}

// 注册API
export const register = (data: RegisterRequest): Promise<{ data: RegisterResponse }> => {
  return api.post('/api/auth/signup', data)
}