// 分类类型
export interface Category {
  id: number
  name: string
  description?: string
  createTime: string
  updateTime: string
}

export interface CategoryDto {
  name: string
  description?: string
}

export interface CategoryForm {
  id?: number
  name: string
  description?: string
}