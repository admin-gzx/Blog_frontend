<template>
  <div class="tag">
    <div class="container">
      <div class="hero">
        <h1>标签</h1>
        <p>浏览不同标签下的文章</p>
      </div>
      
      <div class="tag-list">
        <div class="tag-item card" v-for="tag in tags" :key="tag.id">
          <div class="tag-name">
            <router-link :to="`/tag/${tag.id}`">{{ tag.name }}</router-link>
          </div>
          <div class="tag-description">
            {{ tag.description }}
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
import { getTags } from '@/services/tagService'
import type { Tag } from '@/types'

const tags = ref<Tag[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const fetchTags = async () => {
  try {
    const response = await getTags({
      page: currentPage.value - 1,
      size: pageSize.value
    })
    tags.value = response.data.items
    total.value = response.data.total
  } catch (error) {
    console.error('获取标签列表失败:', error)
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchTags()
}

onMounted(() => {
  fetchTags()
})
</script>

<style scoped>
.tag {
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

.tag-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.tag-item {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}

.tag-name {
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

.tag-description {
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>