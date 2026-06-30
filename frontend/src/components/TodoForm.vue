<template>
  <form class="add-form" @submit.prevent="handleSubmit">
    <div class="add-row">
      <input
        v-model="title"
        type="text"
        placeholder="Что нужно сделать?"
        class="add-input"
        required
      />
      
      <select v-model="priority" class="priority-select">
        <option value="high">🔴 Высокий</option>
        <option value="medium" selected>🟡 Средний</option>
        <option value="low">🟢 Низкий</option>
      </select>
    </div>
    
    <button 
      type="submit" 
      class="add-btn" 
      :disabled="!title.trim() || loading"
    >
      ➕ Добавить
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['add'])

const title = ref('')
const priority = ref('medium')

function handleSubmit() {
  if (!title.value.trim()) return
  
  emit('add', {
    title: title.value.trim(),
    priority: priority.value
  })
  
  title.value = ''
  priority.value = 'medium'
}
</script>

<style scoped>
.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.add-row {
  display: flex;
  gap: 10px;
  flex: 1;
  flex-wrap: wrap;
}

.add-input {
  flex: 2;
  min-width: 150px;
  padding: 10px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.add-input:focus {
  border-color: #667eea;
}

.priority-select {
  padding: 10px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: white;
  color: #a0aec0;
  cursor: pointer;
}

.priority-select:focus {
  border-color: #667eea;
}

.add-btn {
  padding: 10px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.add-btn:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.add-btn:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

@media (max-width: 500px) {
  .add-form {
    flex-direction: column;
  }
  
  .add-row {
    flex-direction: column;
  }
  
  .add-input,
  .priority-select {
    width: 100%;
  }
}
</style>