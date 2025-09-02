<template>
  <div class="category-detail">
    <div class="container">
      <div class="hero" v-if="category">
        <h1>{{ category.name }}</h1>
        <p v-if="category.description">{{ category.description }}</p>
      </div>
      
      <div class="article-list" v-if="articles.length > 0">
        <div class="article-item card" v-for="article in articles" :key="article.id">
          <div class="article-cover" v-if="article.coverImage">
            <img :src="article.coverImage" :alt="article.title" />
          </div>
          <div class="article-title">
            <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
          </div>
          <div class="article-meta">
            <span>作者: {{ article.author.nickname || article.author.username }}</span>
            <span>分类: {{ article.categoryName }}</span>
            <span>发布时间: {{ formatDate(article.createTime) }}</span>
            <span>浏览: {{ article.viewCount }}</span>
          </div>
          <div class="article-summary">
            {{ article.summary }}
          </div>
        </div>
      </div>
      
      <div class="pagination" v-if="articles.length > 0">
        <el-pagination
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next"
        />
      </div>
      
      <div class="empty-state" v-if="!loading && articles.length === 0">
        <el-empty description="该分类下暂无文章" />
      </div>
      
      <div class="loading" v-if="loading">
        <el-skeleton :rows="5" animated />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCategory } from '@/services/categoryService'
import { getArticlesByCategory } from '@/services/articleService'
import { formatDate } from '@/utils'
import type { Category, Article } from '@/types'

const route = useRoute()
const category = ref<Category | null>(null)
const articles = ref<Article[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(true)

const fetchCategory = async (id: number) => {
  try {
    const response = await getCategory(id)
    category.value = response.data
  } catch (error) {
    console.error('获取分类信息失败:', error)
  }
}

const fetchArticles = async (categoryId: number) => {
  try {
    loading.value = true
    const response = await getArticlesByCategory(categoryId, {
      page: currentPage.value - 1,
      size: pageSize.value
    })
    articles.value = response.data.items
    total.value = response.data.total
  } catch (error) {
    console.error('获取分类下的文章列表失败:', error)
  } finally {
    loading.value = false
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  if (category.value) {
    fetchArticles(category.value.id)
  }
}

onMounted(() => {
  const categoryId = parseInt(route.params.id as string)
  if (categoryId) {
    fetchCategory(categoryId)
    fetchArticles(categoryId)
  } else {
    loading.value = false
  }
})
</script>

<style scoped>
.category-detail {
  padding: 20px 0;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 32px;
    margin-bottom: 10px;
    color: var(--text-color);
  }
  
  p {
    font-size: 16px;
    color: #666;
  }
}

.article-list {
  margin-bottom: 40px;
}

.empty-state, .loading {
  padding: 40px 0;
}
</style>