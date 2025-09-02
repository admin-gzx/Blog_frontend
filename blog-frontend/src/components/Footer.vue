<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>关于博客</h3>
          <p>这是一个清新风格的技术博客，分享编程知识和经验。</p>
        </div>
        
        <div class="footer-section">
          <h3>联系方式</h3>
          <p>邮箱: 3105216868@qq.com</p>
          <p>GitHub: github.com</p>
        </div>
        
        <div class="footer-section">
          <h3>友情链接</h3>
          <ul>
            <li><a href="#" target="_blank">Vue.js</a></li>
            <li><a href="#" target="_blank">Element Plus</a></li>
            <li><a href="#" target="_blank">Vite</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 我的博客. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// footer组件不需要额外的逻辑
</script>

<style scoped>
.footer {
  background-color: white;
  border-top: 1px solid var(--border-color);
  padding: 40px 0 20px;
  margin-top: 60px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.footer-section {
  flex: 1;
  padding: 0 20px;
  
  h3 {
    font-size: 18px;
    margin-bottom: 15px;
    color: var(--text-color);
  }
  
  p {
    color: #666;
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    
    li {
      margin-bottom: 8px;
      
      a {
        color: #666;
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  color: #999;
}
</style>