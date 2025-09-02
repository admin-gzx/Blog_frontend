import api from './api'
import type { Article, PaginationParams, PaginationResponse } from '@/types'

// 创建文章请求参数类型
interface CreateArticleRequest {
  title: string
  summary: string
  content: string
  tagIds?: number[]
  categoryId?: number
}

// 更新文章请求参数类型
interface UpdateArticleRequest {
  title: string
  summary: string
  content: string
  tagIds?: number[]
  categoryId?: number
}

// 创建文章API
export const createArticle = (data: CreateArticleRequest) => {
  return api.post<Article>('/articles', data)
}

// 更新文章API
export const updateArticle = (id: number, data: UpdateArticleRequest) => {
  return api.put<Article>(`/articles/${id}`, data)
}

// 删除文章API
export const deleteArticle = (id: number) => {
  return api.delete(`/articles/${id}`)
}

// 获取文章列表API
export const getArticles = (params: PaginationParams) => {
  // 转换参数以匹配后端API
  const apiParams = {
    page: params.page,
    size: params.size || 10
  }
  return api.get<PaginationResponse<Article>>('/articles', { params: apiParams })
}

// 获取文章详情API
export const getArticle = (id: number) => {
  return api.get<Article>(`/articles/${id}`)
}