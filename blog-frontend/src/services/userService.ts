import api from './api'
import type { User, PaginationParams, PaginationResponse } from '@/types'

// 创建用户请求参数类型
interface CreateUserRequest {
  username: string
  password: string
  email: string
  nickname?: string
}

// 更新用户请求参数类型
interface UpdateUserRequest {
  username: string
  password?: string
  email: string
  nickname?: string
}

// 创建用户API
export const createUser = (data: CreateUserRequest) => {
  return api.post<User>('/api/users', data)
}

// 根据ID获取用户API
export const getUser = (id: number) => {
  return api.get<User>(`/api/users/${id}`)
}

// 更新用户API
export const updateUser = (id: number, data: UpdateUserRequest) => {
  return api.put<User>(`/api/users/${id}`, data)
}

// 删除用户API
export const deleteUser = (id: number) => {
  return api.delete(`/api/users/${id}`)
}

// 获取用户列表API
export const getUsers = (params: PaginationParams) => {
  // 转换参数以匹配后端API
  const apiParams = {
    page: params.page,
    size: params.size || 10
  }
  return api.get<PaginationResponse<User>>('/api/users', { params: apiParams })
}

// 检查用户名是否存在API
export const checkUsernameExists = (username: string) => {
  return api.get<boolean>(`/api/users/exists/username/${username}`)
}

// 检查邮箱是否存在API
export const checkEmailExists = (email: string) => {
  return api.get<boolean>(`/api/users/exists/email/${email}`)
}