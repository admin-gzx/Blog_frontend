// 用户类型
export interface User {
  id: number
  username: string
  email: string
  nickname?: string
  avatar?: string
  enabled: boolean
  createTime: string
  updateTime: string
}

export type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './auth'