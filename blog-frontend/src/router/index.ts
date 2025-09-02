import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import MyArticles from '@/views/MyArticles.vue'
import EditArticle from '@/views/EditArticle.vue'
import Category from '@/views/Category.vue'
import Tag from '@/views/Tag.vue'
import CategoryDetail from '@/views/CategoryDetail.vue'
import TagDetail from '@/views/TagDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/article/:id', component: ArticleDetail, props: true },
  { path: '/my-articles', component: MyArticles },
  { path: '/edit-article', component: EditArticle },
  { path: '/edit-article/:id', component: EditArticle, props: true },
  { path: '/categories', component: Category },
  { path: '/category/:id', component: CategoryDetail, props: true },
  { path: '/tags', component: Tag },
  { path: '/tag/:id', component: TagDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router