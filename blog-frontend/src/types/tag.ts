// 标签类型
export interface Tag {
  id: number
  name: string
  description?: string
  createTime: string
  updateTime: string
}

export interface TagDto {
  name: string
  description?: string
}

export interface TagForm {
  id?: number
  name: string
  description?: string
}