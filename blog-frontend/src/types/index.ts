// 用户类型
export interface User {
  id: number
  username: string
  email: string
  nickname: string
  avatar?: string
  createdAt: string
}

// 文章类型
export interface Article {
  id: number
  title: string
  summary: string
  content: string
  categoryId?: number
  categoryName?: string
  tagIds?: number[]
  tags?: Tag[]
  authorId: number
  authorName: string
  username: string
  viewCount: number
  likeCount: number
  createdAt: string
  updatedAt: string
  createTime: string
}

// 分类类型
export interface Category {
  id: number
  name: string
  createdAt: string
}

// 标签类型
export interface Tag {
  id: number
  name: string
  createdAt: string
}

// 分页响应类型
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