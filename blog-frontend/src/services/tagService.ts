import api from './api'
import type { Tag, PaginationParams, PaginationResponse } from '@/types'

// 创建标签请求参数类型
interface CreateTagRequest {
  name: string
  description?: string
}

// 更新标签请求参数类型
interface UpdateTagRequest {
  name: string
  description?: string
}

// 创建标签API
export const createTag = (data: CreateTagRequest) => {
  return api.post<Tag>('/api/tags', data)
}

// 根据ID获取标签API
export const getTag = (id: number) => {
  return api.get<Tag>(`/api/tags/${id}`)
}

// 更新标签API
export const updateTag = (id: number, data: UpdateTagRequest) => {
  return api.put<Tag>(`/api/tags/${id}`, data)
}

// 删除标签API
export const deleteTag = (id: number) => {
  return api.delete(`/api/tags/${id}`)
}

// 获取标签列表API
export const getTags = (params: PaginationParams) => {
  // 转换参数以匹配后端API
  const apiParams = {
    page: params.page,
    size: params.size || 10
  }
  return api.get<PaginationResponse<Tag>>('/api/tags', { params: apiParams })
}

// 检查标签名称是否存在API
export const checkTagExists = (name: string) => {
  return api.get<boolean>(`/api/tags/exists/${name}`)
}