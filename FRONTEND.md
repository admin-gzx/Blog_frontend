# 前端开发文档

## 1. 前端技术栈

基于后端项目的技术特点和现代前端开发趋势，我们选择以下技术栈：

- Vue 3 (Composition API)
- TypeScript
- Vite
- Vue Router 4
- Pinia (状态管理)
- Axios (HTTP客户端)
- Element Plus (UI组件库)
- Sass (CSS预处理器)

## 2. 项目骨架搭建

### 2.1 初始化项目

使用Vite初始化Vue3 + TypeScript项目：

```bash
npm create vite@latest blog-frontend -- --template vue-ts
```

### 2.2 安装依赖

```bash
cd blog-frontend
npm install
npm install vue-router@4 pinia axios element-plus sass
```

### 2.3 目录结构

```
blog-frontend/
├── src/
│   ├── assets/           # 静态资源
│   ├── components/       # 公共组件
│   ├── views/            # 页面组件
│   ├── router/           # 路由配置
│   ├── store/            # 状态管理
│   ├── services/         # API服务
│   ├── utils/            # 工具函数
│   ├── types/            # TypeScript类型定义
│   ├── styles/           # 全局样式
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── public/               # 公共文件
├── index.html            # HTML模板
└── vite.config.ts        # Vite配置
```

### 2.4 路由配置

在`src/router/index.ts`中配置路由：

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  // 更多路由...
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### 2.5 状态管理

在`src/store/index.ts`中配置Pinia：

```typescript
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia
```

### 2.6 HTTP客户端配置

在`src/services/api.ts`中配置Axios：

```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // 处理未授权错误
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
```

## 3. 核心功能实现

### 3.1 认证模块

#### 3.1.1 登录

**接口**: `POST /auth/login`
**请求示例**:
```json
{
  "username": "user1",
  "password": "password123"
}
```
**响应示例**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": 1,
      "username": "user1",
      "email": "user1@example.com",
      "nickname": "用户1",
      "avatar": null,
      "enabled": true
    }
  }
}
```

**前端实现**:

```typescript
// src/services/authService.ts
import api from './api'

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  token: string
  user: User
}

export const login = (data: LoginRequest) => {
  return api.post<LoginResponse>('/auth/login', data)
}
```

#### 3.1.2 注册

**接口**: `POST /auth/register`
**请求示例**:
```json
{
  "username": "newuser",
  "password": "newpassword",
  "email": "newuser@example.com",
  "nickname": "新用户"
}
```
**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "newuser",
    "password": null,
    "email": "newuser@example.com",
    "nickname": "新用户",
    "avatar": null,
    "enabled": true,
    "createTime": "2023-05-01T12:00:00",
    "updateTime": "2023-05-01T12:00:00"
  }
}
```

**前端实现**:

```typescript
// src/services/authService.ts
interface RegisterRequest {
  username: string
  password: string
  email: string
  nickname: string
}

export const register = (data: RegisterRequest) => {
  return api.post<User>('/auth/register', data)
}
```

### 3.2 文章管理模块

#### 3.2.1 创建文章

**接口**: `POST /api/articles`
**请求示例**:
```json
{
  "title": "Vue 3开发指南",
  "content": "Vue 3是Vue.js的最新主要版本...",
  "summary": "Vue 3开发指南摘要",
  "categoryId": 1,
  "tagIds": [1, 2]
}
```
**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Vue 3开发指南",
    "content": "Vue 3是Vue.js的最新主要版本...",
    "summary": "Vue 3开发指南摘要",
    "categoryId": 1,
    "categoryName": "技术",
    "tagIds": [1, 2],
    "tagNames": ["Vue", "前端"],
    "viewCount": 0,
    "userId": 1,
    "username": "user1",
    "createTime": "2023-05-01T12:00:00",
    "updateTime": "2023-05-01T12:00:00"
  }
}
```

**前端实现**:

```typescript
// src/services/articleService.ts
import api from './api'

interface CreateArticleRequest {
  title: string
  content: string
  summary: string
  categoryId: number
  tagIds: number[]
}

export const createArticle = (data: CreateArticleRequest) => {
  return api.post<Article>('/api/articles', data)
}
```

#### 3.2.2 更新文章

**接口**: `PUT /api/articles/{id}`
**请求示例**:
```json
{
  "title": "Vue 3开发指南(更新版)",
  "content": "Vue 3是Vue.js的最新主要版本，提供了许多新特性...",
  "summary": "Vue 3开发指南摘要(更新版)",
  "categoryId": 1,
  "tagIds": [1, 2, 3]
}
```
**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Vue 3开发指南(更新版)",
    "content": "Vue 3是Vue.js的最新主要版本，提供了许多新特性...",
    "summary": "Vue 3开发指南摘要(更新版)",
    "categoryId": 1,
    "categoryName": "技术",
    "tagIds": [1, 2, 3],
    "tagNames": ["Vue", "前端", "框架"],
    "viewCount": 10,
    "userId": 1,
    "username": "user1",
    "createTime": "2023-05-01T12:00:00",
    "updateTime": "2023-05-02T12:00:00"
  }
}
```

**前端实现**:

```typescript
// src/services/articleService.ts
interface UpdateArticleRequest {
  title: string
  content: string
  summary: string
  categoryId: number
  tagIds: number[]
}

export const updateArticle = (id: number, data: UpdateArticleRequest) => {
  return api.put<Article>(`/api/articles/${id}`, data)
}
```

#### 3.2.3 删除文章

**接口**: `DELETE /api/articles/{id}`
**响应示例**:
```json
{
  "success": true,
  "data": null
}
```

**前端实现**:

```typescript
// src/services/articleService.ts
export const deleteArticle = (id: number) => {
  return api.delete(`/api/articles/${id}`)
}
```

#### 3.2.4 分页获取所有文章

**接口**: `GET /api/articles?page={page}&size={size}&sortBy={sortBy}&sortOrder={sortOrder}`
**响应示例**:
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "title": "Vue 3开发指南",
        "content": "Vue 3是Vue.js的最新主要版本...",
        "summary": "Vue 3开发指南摘要",
        "categoryId": 1,
        "categoryName": "技术",
        "tagIds": [1, 2],
        "tagNames": ["Vue", "前端"],
        "viewCount": 0,
        "userId": 1,
        "username": "user1",
        "createTime": "2023-05-01T12:00:00",
        "updateTime": "2023-05-01T12:00:00"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1
  }
}
```

**前端实现**:

```typescript
// src/services/articleService.ts
interface PageRequest {
  page: number
  size: number
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
}

export const getArticles = (params: PageRequest) => {
  return api.get<PageResponse<Article>>('/api/articles', { params })
}
```

### 3.3 分类管理模块

#### 3.3.1 创建分类

**接口**: `POST /api/categories`
**请求示例**:
```json
{
  "name": "技术",
  "description": "技术类文章"
}
```
**响应示例**:
```json
{
  "id": 1,
  "name": "技术",
  "description": "技术类文章",
  "createTime": "2023-05-01T12:00:00",
  "updateTime": "2023-05-01T12:00:00"
}
```

**前端实现**:

```typescript
// src/services/categoryService.ts
interface CreateCategoryRequest {
  name: string
  description: string
}

export const createCategory = (data: CreateCategoryRequest) => {
  return api.post<Category>('/api/categories', data)
}
```

#### 3.3.2 获取分类列表

**接口**: `GET /api/categories?page={page}&size={size}`
**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "技术",
      "description": "技术类文章",
      "createTime": "2023-05-01T12:00:00",
      "updateTime": "2023-05-01T12:00:00"
    }
  ]
}
```

**前端实现**:

```typescript
// src/services/categoryService.ts
export const getCategories = (params: PageRequest) => {
  return api.get<PageResponse<Category>>('/api/categories', { params })
}
```

### 3.4 标签管理模块

#### 3.4.1 创建标签

**接口**: `POST /api/tags`
**请求示例**:
```json
{
  "name": "Spring Boot",
  "description": "Spring Boot相关文章"
}
```
**响应示例**:
```json
{
  "id": 1,
  "name": "Spring Boot",
  "description": "Spring Boot相关文章",
  "createTime": "2023-05-01T12:00:00",
  "updateTime": "2023-05-01T12:00:00"
}
```

**前端实现**:

```typescript
// src/services/tagService.ts
interface CreateTagRequest {
  name: string
  description: string
}

export const createTag = (data: CreateTagRequest) => {
  return api.post<Tag>('/api/tags', data)
}
```

#### 3.4.2 获取标签列表

**接口**: `GET /api/tags?page={page}&size={size}`
**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Spring Boot",
      "description": "Spring Boot相关文章",
      "createTime": "2023-05-01T12:00:00",
      "updateTime": "2023-05-01T12:00:00"
    }
  ]
}
```

**前端实现**:

```typescript
// src/services/tagService.ts
export const getTags = (params: PageRequest) => {
  return api.get<PageResponse<Tag>>('/api/tags', { params })
}
```

## 4. 所有功能实现

### 4.1 用户管理

#### 4.1.1 获取用户列表

**接口**: `GET /api/users?page={page}&size={size}`
**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "username": "user1",
      "password": null,
      "email": "user1@example.com",
      "nickname": "用户1",
      "avatar": null,
      "enabled": true,
      "createTime": "2023-05-01T12:00:00",
      "updateTime": "2023-05-01T12:00:00"
    }
  ]
}
```

#### 4.1.2 检查用户名是否存在

**接口**: `GET /api/users/exists/username/{username}`
**响应示例**:
```json
{
  "success": true,
  "data": true
}
```

### 4.2 权限控制

前端需要根据用户角色实现权限控制：

1. 公共访问：无需登录即可访问的页面（如首页、文章详情页）
2. 用户访问：需要登录才能访问的页面（如个人中心、文章发布页）
3. 管理员访问：需要管理员权限才能访问的页面（如用户管理、分类管理）

在路由守卫中实现权限控制：

```typescript
// src/router/index.ts
import { useAuthStore } from '@/store/auth'

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/')
  } else {
    next()
  }
})
```

## 5. 页面开发

### 5.1 首页

首页展示文章列表，包含分页功能。

### 5.2 文章列表页

展示所有文章，支持按分类、标签筛选。

### 5.3 文章详情页

展示文章详细内容，包括标题、内容、作者、发布时间、浏览量等。

### 5.4 文章编辑页

提供表单用于创建或编辑文章，包含标题、内容、摘要、分类选择、标签选择等字段。

### 5.5 用户中心

用户个人信息管理，包括修改昵称、邮箱等。

### 5.6 管理后台

管理员功能页面，包括用户管理、分类管理、标签管理等。