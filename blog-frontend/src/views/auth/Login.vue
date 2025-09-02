<template>
  <div class="login">
    <div class="container">
      <div class="card" style="max-width: 400px; margin: 0 auto;">
        <h2 style="text-align: center; margin-bottom: 30px;">用户登录</h2>
        <el-form :model="loginForm" :rules="rules" ref="formRef" @submit.prevent="handleLogin">
          <el-form-item prop="username">
            <el-input 
              v-model="loginForm.username" 
              placeholder="请输入用户名" 
              prefix-icon="User"
            />
          </el-form-item>
          
          <el-form-item prop="password">
            <el-input 
              v-model="loginForm.password" 
              type="password" 
              placeholder="请输入密码" 
              prefix-icon="Lock"
            />
          </el-form-item>
          
          <el-form-item>
            <el-button 
              type="primary" 
              native-type="submit" 
              :loading="loading" 
              style="width: 100%"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
        
        <div style="text-align: center; margin-top: 20px;">
          <router-link to="/register">还没有账号？立即注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import useAuthStore from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()
const formRef = ref()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  try {
    await formRef.value.validate()
    
    loading.value = true
    await authStore.login(loginForm.username, loginForm.password)
    
    // 显示成功消息
    ElMessage.success('登录成功')
    
    // 跳转到首页
    router.push('/')
  } catch (error: any) {
    console.error('登录失败:', error)
    ElMessage.error(error.response?.data?.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login {
  padding: 80px 0;
}
</style>