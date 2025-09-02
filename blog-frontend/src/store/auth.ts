import { defineStore } from 'pinia'
import { login as loginApi, register as registerApi } from '@/services/authService'
import type { User } from '@/types'

interface AuthState {
  currentUser: User | null
  token: string | null
}

const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    currentUser: null,
    token: localStorage.getItem('token')
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUserNickname: (state) => state.currentUser?.nickname || state.currentUser?.username || ''
  },

  actions: {
    async login(username: string, password: string) {
      try {
        const response = await loginApi({ username, password })
        const { token, user } = response.data
        
        this.token = token
        this.currentUser = user
        
        localStorage.setItem('token', token)
        
        return response
      } catch (error) {
        // 清除可能存在的无效token
        this.logout()
        throw error
      }
    },

    async register(username: string, email: string, nickname: string, password: string) {
      try {
        const response = await registerApi({ username, email, nickname, password })
        return response
      } catch (error) {
        throw error
      }
    },

    logout() {
      this.token = null
      this.currentUser = null
      localStorage.removeItem('token')
    },

    // 检查认证状态
    checkAuthStatus() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        // 这里可以添加获取用户信息的逻辑
      }
    }
  }
})

export default useAuthStore