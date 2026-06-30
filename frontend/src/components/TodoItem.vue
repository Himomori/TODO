<template>
  <li class="todo-item" :class="[todo.completed ? 'completed' : '', todo.priority]">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="emit('toggle', todo)"
      class="todo-checkbox"
    />

    <span :class="['todo-title', { done: todo.completed }]">
      {{ todo.title }}
    </span>

    <span class="priority-badge" :class="todo.priority">
      {{ priorityLabel }}
    </span>

    <div class="todo-actions">
      <button @click="emit('edit', todo)" class="edit-btn" title="Редактировать">
        ✏️
      </button>
      <button @click="emit('delete', todo)" class="delete-btn" title="Удалить">
        ❌
      </button>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'edit', 'delete'])

const priorityLabel = computed(() => {
  const labels = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий'
  }
  return labels[props.todo.priority] || props.todo.priority
})
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  border-left: 4px solid #e2e8f0;
  margin-bottom: 6px;
  background: white;
  transition: all 0.2s;
}

.todo-item:hover {
  background: #f7fafc;
}

.todo-item.high { border-left-color: #ef4444; }
.todo-item.medium { border-left-color: #f59e0b; }
.todo-item.low { border-left-color: #22c55e; }

.todo-item.completed {
  opacity: 0.6;
  border-left-color: #a0aec0;
}

.todo-item.completed:hover {
  background: #f7fafc;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  flex-shrink: 0;
}

.todo-title {
  flex: 1;
  font-size: 16px;
  color: #1a202c;
  word-break: break-word;
}

.todo-title.done {
  text-decoration: line-through;
  color: #a0aec0;
}

.priority-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 12px;
  white-space: nowrap;
}

.priority-badge.high {
  background: #ef4444;
  color: white;
}

.priority-badge.medium {
  background: #f59e0b;
  color: white;
}

.priority-badge.low {
  background: #22c55e;
  color: white;
}

.todo-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.edit-btn,
.delete-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.2s;
  opacity: 0.3;
}

.todo-item:hover .edit-btn,
.todo-item:hover .delete-btn {
  opacity: 1;
}

.edit-btn:hover {
  background: #ebf4ff;
  transform: scale(1.1);
}

.delete-btn:hover {
  background: #fee2e2;
  transform: scale(1.1);
}

@media (max-width: 500px) {
  .todo-item {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .todo-actions {
    margin-left: auto;
  }
}
</style>