<template>
  <div class="stats-container">
    <div class="header">
      <h2>📋 Мои задачи</h2>
      <span class="stats">
        Осталось {{ store.activeCount }} из {{ store.totalCount }}
      </span>
    </div>

    <div class="progress-container">
      <div class="progress-bar" :style="{ width: store.progress + '%' }">
        <span class="progress-text">{{ store.progress }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore.js'

const store = useTodoStore()
</script>

<style scoped>
.stats-container {
  margin-bottom: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.header h2 {
  font-size: 20px;
  color: #1a202c;
  margin: 0;
}

.stats {
  font-size: 14px;
  color: #4a5568;
  background: #f7fafc;
  padding: 4px 16px;
  border-radius: 20px;
}

.progress-container {
  width: 100%;
  height: 20px;
  background: #edf2f7;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
}

.progress-text {
  font-size: 11px;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
</style>