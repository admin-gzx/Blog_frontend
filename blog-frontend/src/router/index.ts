import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import MyArticles from '@/views/MyArticles.vue'
import EditArticle from '@/views/EditArticle.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/article/:id', component: ArticleDetail, props: true },
  { path: '/my-articles', component: MyArticles },
  { path: '/edit-article', component: EditArticle },
  { path: '/edit-article/:id', component: EditArticle, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router