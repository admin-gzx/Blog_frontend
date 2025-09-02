<template>
  <div class="article-detail">
    <div class="container">
      <div class="card" v-if="article">
        <h1 class="article-title">{{ article.title }}</h1>
        
        <div class="article-cover" v-if="article.coverImage">
          <img :src="article.coverImage" :alt="article.title" />
        </div>
        
        <div class="article-meta">
          <span>作者: {{ article.author.nickname || article.author.username }}</span>
          <span>分类: {{ article.categoryName }}</span>
          <span>发布时间: {{ formatDate(article.createTime) }}</span>
          <span>浏览: {{ article.viewCount }}</span>
        </div>
        
        <div class="article-content" v-html="article.content"></div>
        
        <div class="article-tags" v-if="article.tags && article.tags.length">
          <el-tag 
            v-for="tag in article.tags" 
            :key="tag.id" 
            type="success" 
            style="margin-right: 10px;"
          >
            {{ tag.name }}
          </el-tag>
        </div>
      </div>
      
      <div class="card" v-else-if="loading">
        <el-skeleton :rows="10" animated />
      </div>
      
      <div class="card" v-else>
        <el-empty description="文章不存在" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getArticle } from '@/services/articleService'
import { formatDate } from '@/utils'
import type { Article } from '@/types'

const route = useRoute()
const article = ref<Article | null>(null)
const loading = ref(true)

const fetchArticle = async (id: number) => {
  try {
    loading.value = true
    const response = await getArticle(id)
    article.value = response.data
    
    if (!article.value) {
      ElMessage.error('文章不存在')
    }
  } catch (error) {
    console.error('获取文章失败:', error)
    ElMessage.error('获取文章失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const id = parseInt(route.params.id as string)
  if (id) {
    fetchArticle(id)
  } else {
    loading.value = false
  }
})
</script>

<style scoped>
.article-detail {
  padding: 40px 0;
}

.article-title {
  font-size: 32px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.article-cover {
  margin-bottom: 20px;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.article-meta {
  padding: 15px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 30px;
  
  span {
    margin-right: 20px;
    color: #999;
  }
}

.article-content {
  line-height: 1.8;
  font-size: 16px;
  
  :deep(h1) {
    font-size: 28px;
    margin: 20px 0;
  }
  
  :deep(h2) {
    font-size: 24px;
    margin: 18px 0;
  }
  
  :deep(h3) {
    font-size: 20px;
    margin: 16px 0;
  }
  
  :deep(p) {
    margin: 15px 0;
  }
  
  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  :deep(code) {
    background-color: #f5f7fa;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
  }
  
  :deep(pre) {
    background-color: #f5f7fa;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
  }
}

.article-tags {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}
</style>