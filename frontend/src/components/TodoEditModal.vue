<template>
  <div class="modal-overlay" @click.self="handleClose">
    <div class="modal">
      <h2>{{ isDeleteMode ? '🗑️ Удалить задачу' : '✏️ Редактировать' }}</h2>
      
      <div v-if="isDeleteMode" class="delete-confirm">
        <p class="delete-text">
          Вы уверены, что хотите удалить задачу?
        </p>
        <p class="delete-title">"{{ todo.title }}"</p>
        <p class="delete-warning">⚠️ Это действие нельзя отменить</p>
      </div>

      <template v-else>
        <input 
          v-model="editTitle" 
          type="text" 
          class="modal-input" 
          placeholder="Название задачи"
          @keyup.enter="handleSave"
        />
        
        <select v-model="editPriority" class="modal-select">
          <option value="high">🔴 Высокий</option>
          <option value="medium">🟡 Средний</option>
          <option value="low">🟢 Низкий</option>
        </select>
      </template>
      
      <div class="modal-actions">
        <button 
          v-if="!isDeleteMode"
          @click="handleSave" 
          class="save-btn" 
          :disabled="!editTitle.trim()"
        >
          💾 Сохранить
        </button>
        
        <button 
          v-if="isDeleteMode"
          @click="handleDelete" 
          class="delete-btn"
        >
          🗑️ Удалить
        </button>
        
        <button @click="handleClose" class="cancel-btn">
          {{ isDeleteMode ? 'Отмена' : 'Отмена' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
  mode: {
    type: String,
    default: 'edit',
    validator: (value) => ['edit', 'delete'].includes(value)
  }
})

const emit = defineEmits(['save', 'delete', 'close'])

const editTitle = ref('')
const editPriority = ref('medium')
const isDeleteMode = ref(false)

watch(() => props.todo, (newTodo) => {
  if (newTodo) {
    editTitle.value = newTodo.title
    editPriority.value = newTodo.priority || 'medium'
  }
}, { immediate: true })

watch(() => props.mode, (newMode) => {
  isDeleteMode.value = newMode === 'delete'
}, { immediate: true })

function handleSave() {
  if (!editTitle.value.trim()) return
  
  emit('save', {
    id: props.todo.id,
    title: editTitle.value.trim(),
    priority: editPriority.value
  })
}

function handleDelete() {
  emit('delete', props.todo.id)
}

function handleClose() {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s;
}

.modal {
  background: white;
  padding: 28px;
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.2s;
}

.modal h2 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #1a202c;
}

.modal-input {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 12px;
  box-sizing: border-box;
  outline: none;
}

.modal-input:focus {
  border-color: #667eea;
}

.modal-select {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 16px;
  background: white;
  color: #a0aec0;
  outline: none;
}

.modal-select:focus {
  border-color: #667eea;
}

.modal-actions {
  display: flex;
  gap: 10px;
}

.save-btn {
  flex: 1;
  padding: 10px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.save-btn:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-2px);
}

.save-btn:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.delete-btn {
  flex: 1;
  padding: 10px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: #b91c1c;
  transform: translateY(-2px);
}

.cancel-btn {
  flex: 1;
  padding: 10px;
  background: #edf2f7;
  color: #4a5568;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.cancel-btn:hover {
  background: #e2e8f0;
}

.delete-confirm {
  margin-bottom: 20px;
}

.delete-text {
  font-size: 16px;
  color: #4a5568;
  margin-bottom: 8px;
}

.delete-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  padding: 12px;
  background: #f7fafc;
  border-radius: 8px;
  text-align: center;
  margin: 12px 0;
}

.delete-warning {
  color: #dc2626;
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>