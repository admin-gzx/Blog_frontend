import api from './api'
import type { Category, PaginationParams, PaginationResponse } from '@/types'

// 创建分类请求参数类型
interface CreateCategoryRequest {
  name: string
  description?: string
}

// 更新分类请求参数类型
interface UpdateCategoryRequest {
  name: string
  description?: string
}

// 创建分类API
export const createCategory = (data: CreateCategoryRequest) => {
  return api.post<Category>('/api/categories', data)
}

// 根据ID获取分类API
export const getCategory = (id: number) => {
  return api.get<Category>(`/api/categories/${id}`)
}

// 更新分类API
export const updateCategory = (id: number, data: UpdateCategoryRequest) => {
  return api.put<Category>(`/api/categories/${id}`, data)
}

// 删除分类API
export const deleteCategory = (id: number) => {
  return api.delete(`/api/categories/${id}`)
}

// 获取分类列表API
export const getCategories = (params: PaginationParams) => {
  // 转换参数以匹配后端API
  const apiParams = {
    page: params.page,
    size: params.size || 10
  }
  return api.get<PaginationResponse<Category>>('/api/categories', { params: apiParams })
}

// 检查分类名称是否存在API
export const checkCategoryExists = (name: string) => {
  return api.get<boolean>(`/api/categories/exists/${name}`)
}