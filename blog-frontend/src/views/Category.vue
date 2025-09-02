<template>
  <div class="category">
    <div class="container">
      <div class="hero">
        <h1>分类</h1>
        <p>浏览不同分类下的文章</p>
      </div>
      
      <div class="category-list">
        <div class="category-item card" v-for="category in categories" :key="category.id">
          <div class="category-name">
            <router-link :to="`/category/${category.id}`">{{ category.name }}</router-link>
          </div>
          <div class="category-description">
            {{ category.description }}
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
import { getCategories } from '@/services/categoryService'
import type { Category } from '@/types'

const categories = ref<Category[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const fetchCategories = async () => {
  try {
    const response = await getCategories({
      page: currentPage.value - 1,
      size: pageSize.value
    })
    categories.value = response.data.items
    total.value = response.data.total
  } catch (error) {
    console.error('获取分类列表失败:', error)
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchCategories()
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.category {
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

.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.category-item {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}

.category-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.category-description {
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>