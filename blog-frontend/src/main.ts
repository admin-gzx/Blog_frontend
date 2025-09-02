import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/main.scss'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)

// 初始化认证状态
import useAuthStore from './store/auth'
const authStore = useAuthStore()
authStore.checkAuthStatus()

app.mount('#app')
