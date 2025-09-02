<template>
  <div class="my-articles">
    <h1>我的文章</h1>
    <div class="actions">
      <el-button type="primary" @click="handleCreateArticle">写文章</el-button>
    </div>
    <div class="article-list">
      <el-table :data="articles" style="width: 100%" v-loading="loading">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="summary" label="摘要" />
        <el-table-column label="封面">
          <template #default="scope">
            <img v-if="scope.row.coverImage" :src="scope.row.coverImage" :alt="scope.row.title" class="cover-image" />
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
      <template #default="scope">
        {{ formatDate(scope.row.createTime) }}
      </template>
    </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEditArticle(scope.row.id)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDeleteArticle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getArticles, deleteArticle } from '@/services/articleService'
import { formatDate } from '@/utils'
import type { Article } from '@/types'

const router = useRouter()
const loading = ref(false)
const articles = ref<Article[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const fetchArticles = async () => {
  try {
    loading.value = true
    const response = await getArticles({
      page: currentPage.value - 1,
      size: pageSize.value
      // 这里可以添加其他筛选条件，比如只获取当前用户的文章
    })
    
    articles.value = response.data.items
    total.value = response.data.total
  } catch (error) {
    console.error('获取文章列表失败:', error)
    ElMessage.error('获取文章列表失败')
  } finally {
    loading.value = false
  }
}

const handleCreateArticle = () => {
  router.push('/edit-article')
}

const handleEditArticle = (id: number) => {
  router.push(`/edit-article/${id}`)
}

const handleDeleteArticle = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定要删除这篇文章吗？', '提示', {
      type: 'warning'
    })
    
    await deleteArticle(id)
    ElMessage.success('删除成功')
    fetchArticles() // 重新获取文章列表
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除文章失败:', error)
      ElMessage.error('删除文章失败')
    }
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

<style scoped lang="scss">
.my-articles {
  padding: 20px;
  
  .actions {
    margin-bottom: 20px;
    text-align: right;
  }
  
  .article-list {
    margin-bottom: 20px;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
  }
  
  .cover-image {
    max-width: 100px;
    max-height: 60px;
    border-radius: 4px;
  }
}
</style>