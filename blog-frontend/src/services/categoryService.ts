import api from './api'
import type { Category, PaginationParams, PaginationResponse } from '@/types'

// 创建分类请求参数类型
interface CreateCategoryRequest {
  name: string
}

// 创建分类API
export const createCategory = (data: CreateCategoryRequest) => {
  return api.post<Category>('/categories', data)
}

// 获取分类列表API
export const getCategories = (params: PaginationParams) => {
  // 转换参数以匹配后端API
  const apiParams = {
    page: params.page,
    size: params.size || 10
  }
  return api.get<PaginationResponse<Category>>('/categories', { params: apiParams })
}