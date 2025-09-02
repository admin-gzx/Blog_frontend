import api from './api'
import type { Article, PaginationParams, PaginationResponse } from '@/types'

// 创建文章请求参数类型
interface CreateArticleRequest {
  title: string
  summary: string
  content: string
  coverImage?: string
  tagIds?: number[]
  categoryId?: number
}

// 更新文章请求参数类型
interface UpdateArticleRequest {
  title: string
  summary: string
  content: string
  coverImage?: string
  tagIds?: number[]
  categoryId?: number
}

// 创建文章API
export const createArticle = (data: CreateArticleRequest) => {
  return api.post<Article>('/api/articles', data)
}

// 更新文章API
export const updateArticle = (id: number, data: UpdateArticleRequest) => {
  return api.put<Article>(`/api/articles/${id}`, data)
}

// 删除文章API
export const deleteArticle = (id: number) => {
  return api.delete(`/api/articles/${id}`)
}

// 获取文章列表API
export const getArticles = (params: PaginationParams) => {
  // 转换参数以匹配后端API
  const apiParams = {
    page: params.page,
    size: params.size || 10
  }
  return api.get<PaginationResponse<Article>>('/api/articles', { params: apiParams })
}

// 分页获取已发布的文章
export const getPublishedArticles = (params: PaginationParams) => {
  // 转换参数以匹配后端API
  const apiParams = {
    page: params.page,
    size: params.size || 10
  }
  return api.get<PaginationResponse<Article>>('/api/articles/published', { params: apiParams })
}

// 根据作者ID分页获取文章
export const getArticlesByAuthor = (authorId: number, params: PaginationParams) => {
  // 转换参数以匹配后端API
  const apiParams = {
    page: params.page,
    size: params.size || 10
  }
  return api.get<PaginationResponse<Article>>(`/api/articles/author/${authorId}`, { params: apiParams })
}

// 根据分类ID分页获取文章
export const getArticlesByCategory = (categoryId: number, params: PaginationParams) => {
  // 转换参数以匹配后端API
  const apiParams = {
    page: params.page,
    size: params.size || 10
  }
  return api.get<PaginationResponse<Article>>(`/api/articles/category/${categoryId}`, { params: apiParams })
}

// 根据标签ID分页获取文章
export const getArticlesByTag = (tagId: number, params: PaginationParams) => {
  // 转换参数以匹配后端API
  const apiParams = {
    page: params.page,
    size: params.size || 10
  }
  return api.get<PaginationResponse<Article>>(`/api/articles/tag/${tagId}`, { params: apiParams })
}

// 分页获取热门文章
export const getPopularArticles = (params: PaginationParams) => {
  // 转换参数以匹配后端API
  const apiParams = {
    page: params.page,
    size: params.size || 10
  }
  return api.get<PaginationResponse<Article>>('/api/articles/popular', { params: apiParams })
}

// 获取热门文章Top5
export const getTopPopularArticles = () => {
  return api.get<Article[]>('/api/articles/popular/top')
}

// 获取文章详情API
export const getArticle = (id: number) => {
  return api.get<Article>(`/api/articles/${id}`)
}