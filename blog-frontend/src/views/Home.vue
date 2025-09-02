<template>
  <div class="home">
    <div class="container">
      <div class="hero">
        <h1>欢迎来到我的博客</h1>
        <p>这里是一个清新风格的技术博客，分享我的学习和经验</p>
      </div>
      
      <div class="article-list">
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
      
      <div class="pagination">
        <el-pagination
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getArticles } from '@/services/articleService'
import { formatDate } from '@/utils'
import type { Article } from '@/types'

const articles = ref<Article[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const fetchArticles = async () => {
  try {
    const response = await getArticles({
      page: currentPage.value - 1,
      size: pageSize.value
    })
    articles.value = response.data.items
    total.value = response.data.total
  } catch (error) {
    console.error('获取文章列表失败:', error)
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchArticles()
}

onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.home {
  padding: 40px 0;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 36px;
    margin-bottom: 20px;
    color: var(--primary-color);
  }
  
  p {
    font-size: 18px;
    color: #666;
  }
}

.article-cover {
  margin-bottom: 15px;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>