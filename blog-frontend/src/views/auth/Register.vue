<template>
  <div class="register">
    <div class="container">
      <div class="card" style="max-width: 400px; margin: 0 auto;">
        <h2 style="text-align: center; margin-bottom: 30px;">用户注册</h2>
        <el-form :model="registerForm" :rules="rules" ref="formRef" @submit.prevent="handleRegister">
          <el-form-item prop="username">
            <el-input 
              v-model="registerForm.username" 
              placeholder="请输入用户名" 
              prefix-icon="User"
            />
          </el-form-item>
          
          <el-form-item prop="email">
            <el-input 
              v-model="registerForm.email" 
              placeholder="请输入邮箱" 
              prefix-icon="Message"
            />
          </el-form-item>
          
          <el-form-item prop="nickname">
            <el-input 
              v-model="registerForm.nickname" 
              placeholder="请输入昵称" 
              prefix-icon="User"
            />
          </el-form-item>
          
          <el-form-item prop="password">
            <el-input 
              v-model="registerForm.password" 
              type="password" 
              placeholder="请输入密码" 
              prefix-icon="Lock"
            />
          </el-form-item>
          
          <el-form-item prop="confirmPassword">
            <el-input 
              v-model="registerForm.confirmPassword" 
              type="password" 
              placeholder="请确认密码" 
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
              注册
            </el-button>
          </el-form-item>
        </el-form>
        
        <div style="text-align: center; margin-top: 20px;">
          <router-link to="/login">已有账号？立即登录</router-link>
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

const registerForm = reactive({
  username: '',
  email: '',
  nickname: '',
  password: '',
  confirmPassword: ''
})

const validateConfirmPassword = (_rule: any, value: string, callback: any) => {
  if (value !== registerForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

const handleRegister = async () => {
  try {
    await formRef.value.validate()
    
    loading.value = true
    await authStore.register(
      registerForm.username,
      registerForm.email,
      registerForm.nickname,
      registerForm.password
    )
    
    // 显示成功消息
    ElMessage.success('注册成功')
    
    // 跳转到登录页
    router.push('/login')
  } catch (error: any) {
    console.error('注册失败:', error)
    ElMessage.error(error.response?.data?.message || '注册失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register {
  padding: 80px 0;
}
</style>