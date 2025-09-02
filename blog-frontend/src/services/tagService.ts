import api from './api'
import type { Tag, PaginationParams, PaginationResponse } from '@/types'

// 创建标签请求参数类型
interface CreateTagRequest {
  name: string
}

// 创建标签API
export const createTag = (data: CreateTagRequest) => {
  return api.post<Tag>('/tags', data)
}

// 获取标签列表API
export const getTags = (params: PaginationParams) => {
  // 转换参数以匹配后端API
  const apiParams = {
    page: params.page,
    size: params.size || 10
  }
  return api.get<PaginationResponse<Tag>>('/tags', { params: apiParams })
}