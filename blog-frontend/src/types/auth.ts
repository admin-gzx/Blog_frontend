import type { User } from './user'

// 登录请求参数类型
export interface LoginRequest {
  username: string
  password: string
}

// 登录响应数据类型
export interface LoginResponse {
  token: string
  type: string
  id: number
  username: string
  email: string
}

// 注册请求参数类型
export interface RegisterRequest {
  username: string
  email: string
  nickname: string
  password: string
}

// 注册响应数据类型
export interface RegisterResponse extends User {}