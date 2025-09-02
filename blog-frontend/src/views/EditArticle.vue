<template>
  <div class="edit-article">
    <h1>{{ isEditing ? '编辑文章' : '写文章' }}</h1>
    <el-form 
      :model="articleForm" 
      :rules="rules" 
      ref="formRef" 
      label-width="80px"
      v-loading="loading"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="articleForm.title" />
      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <el-input v-model="articleForm.summary" type="textarea" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="articleForm.content" type="textarea" :rows="10" />
      </el-form-item>
      <el-form-item label="封面图片" prop="coverImage">
        <el-input v-model="articleForm.coverImage" placeholder="请输入封面图片URL" />
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select 
          v-model="articleForm.tags" 
          multiple 
          filterable 
          allow-create 
          default-first-option
          placeholder="请选择或创建标签"
        >
          <el-option
            v-for="tag in availableTags"
            :key="tag.id"
            :label="tag.name"
            :value="tag.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select 
          v-model="articleForm.category" 
          filterable 
          allow-create 
          default-first-option
          placeholder="请选择或创建分类"
        >
          <el-option
            v-for="category in availableCategories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="submitting">{{ isEditing ? '更新' : '发布' }}</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getArticle, createArticle, updateArticle } from '@/services/articleService'
import { getTags } from '@/services/tagService'
import { getCategories } from '@/services/categoryService'
import type { Article, Tag, Category } from '@/types'

const route = useRoute()
const router = useRouter()
const formRef = ref()
const loading = ref(false)
const submitting = ref(false)
const isEditing = ref(false)
const articleId = ref(0)

const articleForm = reactive({
  title: '',
  summary: '',
  content: '',
  coverImage: '',
  tags: [] as number[] | never[] | undefined,
  category: undefined as number | undefined
})

const availableTags = ref<Tag[]>([])
const availableCategories = ref<Category[]>([])

const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' }
  ]
}

const fetchArticle = async (id: number) => {
  try {
    loading.value = true
    const response = await getArticle(id)
    const article: Article = response.data
    
    articleForm.title = article.title
    articleForm.summary = article.summary
    articleForm.content = article.content
    articleForm.coverImage = article.coverImage || ''
    articleForm.tags = article.tags?.map((tag: Tag) => tag.id) || []
    articleForm.category = article.categoryId ?? undefined
  } catch (error) {
    console.error('获取文章失败:', error)
    ElMessage.error('获取文章失败')
  } finally {
    loading.value = false
  }
}

const fetchTags = async () => {
  try {
    const response = await getTags({ page: 1, size: 100 })
    availableTags.value = response.data.items
  } catch (error) {
    console.error('获取标签失败:', error)
    ElMessage.error('获取标签失败')
  }
}

const fetchCategories = async () => {
  try {
    const response = await getCategories({ page: 1, size: 100 })
    availableCategories.value = response.data.items
  } catch (error) {
    console.error('获取分类失败:', error)
    ElMessage.error('获取分类失败')
  }
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    
    submitting.value = true
    
    if (isEditing.value) {
      await updateArticle(articleId.value, {
        title: articleForm.title,
        summary: articleForm.summary,
        content: articleForm.content,
        coverImage: articleForm.coverImage || undefined,
        tagIds: articleForm.tags,
        categoryId: articleForm.category ?? undefined
      })
      ElMessage.success('文章更新成功')
    } else {
      await createArticle({
        title: articleForm.title,
        summary: articleForm.summary,
        content: articleForm.content,
        coverImage: articleForm.coverImage || undefined,
        tagIds: articleForm.tags,
        categoryId: articleForm.category
      })
      ElMessage.success('文章发布成功')
    }
    
    router.push('/my-articles')
  } catch (error: any) {
    console.error('操作失败:', error)
    ElMessage.error(error.response?.data?.message || '操作失败')
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  router.push('/my-articles')
}

onMounted(() => {
  const id = route.params.id
  
  if (id) {
    isEditing.value = true
    articleId.value = Number(id)
    fetchArticle(articleId.value)
  }
  
  fetchTags()
  fetchCategories()
})
</script>

<style scoped lang="scss">
.edit-article {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>