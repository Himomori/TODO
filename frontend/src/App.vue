<template>
  <div class="app">
    <h1>📝 Мой список задач</h1>
    <TodoApp />
  </div>
</template>

<script setup>
import TodoApp from './components/TodoApp.vue'
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: #f0f2f5;
  min-height: 100vh;
}

.app {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 24px;
  font-size: 2rem;
}
</style>