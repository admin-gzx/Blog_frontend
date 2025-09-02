<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <router-link to="/">我的博客</router-link>
        </div>
        
        <nav class="nav">
          <router-link to="/" class="nav-item" active-class="active">首页</router-link>
          <router-link to="/my-articles" class="nav-item" active-class="active" v-if="isAuthenticated">我的文章</router-link>
          <router-link to="/categories" class="nav-item" active-class="active">分类</router-link>
          <router-link to="/tags" class="nav-item" active-class="active">标签</router-link>
        </nav>
        
        <div class="user-actions">
          <template v-if="isAuthenticated">
            <el-dropdown @command="handleUserCommand">
              <span class="el-dropdown-link">
                {{ currentUser?.nickname || currentUser?.username }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                  <el-dropdown-item command="articles">我的文章</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <router-link to="/login" class="btn btn-secondary" style="margin-right: 10px;">登录</router-link>
            <router-link to="/register" class="btn btn-primary">注册</router-link>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useAuthStore from '@/store/auth'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const currentUser = computed(() => authStore.currentUser)

const handleUserCommand = (command: string) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'articles':
      router.push('/my-articles')
      break
    case 'logout':
      handleLogout()
      break
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.header {
  background-color: white;
  box-shadow: 0 2px 8px var(--shadow-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  
  a {
    color: var(--primary-color);
    text-decoration: none;
  }
}

.nav {
  display: flex;
  
  .nav-item {
    padding: 0 20px;
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &.active,
    &:hover {
      color: var(--primary-color);
    }
  }
}

.user-actions {
  display: flex;
  align-items: center;
  
  .el-dropdown-link {
    cursor: pointer;
    color: var(--text-color);
    display: flex;
    align-items: center;
  }
}
</style>