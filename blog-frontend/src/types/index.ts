export type { User } from './user'
export type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './auth'
export type { Tag } from './tag'
export type { Category } from './category'

// 文章类型
export interface Article {
  id: number
  title: string
  summary: string
  content: string
  coverImage?: string
  categoryId?: number
  categoryName?: string
  tagIds?: number[]
  tags?: Tag[]
  author: User
  viewCount: number
  likeCount: number
  createTime: string
  updateTime: string
}

// 分页响应类型
// API文档中的分页响应是一个数组，而不是包含items、total等字段的对象
// 但为了保持前端代码的一致性，我们保留这个定义
// 在实际使用中，我们需要根据API响应格式进行适配
export interface PaginationResponse<T> {
  items: T[]
  total: number
  totalPages: number
  pageable: {
    pageNumber: number
    pageSize: number
  }
}

// 分页请求参数类型
export interface PaginationParams {
  page: number
  size?: number
}