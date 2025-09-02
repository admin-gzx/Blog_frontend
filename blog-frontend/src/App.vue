<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app">
    <Header />
    <main class="main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding: 20px 0;
}
</style>
