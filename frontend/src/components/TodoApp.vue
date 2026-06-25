<template>
  <div class="todo-container">

    <form class="add-form" @submit.prevent="addTodo">

      <input
        v-model="newTitle"
        type="text"
        placeholder="Введите задачу..."
        class="add-input"
      />

      <button type="submit" class="add-btn" :disabled="!newTitle.trim()">
        Добавить
      </button>

    </form>

    <p v-if="loading" class="status">Загрузка...</p>

    <p v-if="error" class="error">{{ error }}</p>

    <ul class="todo-list">

      <li v-for="todo in todos" :key="todo.id" class="todo-item">

        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo)"
          class="todo-checkbox"
        />


        <span :class="['todo-title', { done: todo.completed }]">
          {{ todo.title }}
        </span>

        <button @click="deleteTodo(todo.id)" class="delete-btn">✕</button>
      </li>
    </ul>

    <p v-if="!loading && todos.length === 0" class="empty">
      Задач нет. Добавь первую! 🎉
    </p>

  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import api from '../services/api.js'

const todos    = ref([])
const newTitle = ref('')
const loading  = ref(false)
const error    = ref('')

onMounted(() => {
  fetchTodos()
})

async function fetchTodos() {
  loading.value = true
  error.value = ''
  try {
    const response = await api.get('/todos')
    todos.value = response.data
  } catch (e) {
    error.value = 'Не удалось загрузить задачи'
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function addTodo() {
  const title = newTitle.value.trim()
  if (!title) return

  try {
    const response = await api.post('/todos', { title })

    todos.value.unshift(response.data)

    newTitle.value = ''
  } catch (e) {
    error.value = 'Не удалось добавить задачу'
    console.error(e)
  }
}

async function toggleTodo(todo) {
  try {
    const response = await api.put(`/todos/${todo.id}`, {
      completed: !todo.completed
    })

    const index = todos.value.findIndex(t => t.id === todo.id)
    todos.value[index] = response.data
  } catch (e) {
    error.value = 'Не удалось обновить задачу'
    console.error(e)
  }
}

async function deleteTodo(id) {
  try {
    await api.delete(`/todos/${id}`)

    todos.value = todos.value.filter(t => t.id !== id)
  } catch (e) {
    error.value = 'Не удалось удалить задачу'
    console.error(e)
  }
}
</script>

<style scoped>

.todo-container {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.add-input {
  flex: 1;
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

.add-btn {
  padding: 10px 18px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-btn:hover:not(:disabled) {
  background: #5a67d8;
}

.add-btn:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.todo-list {
  list-style: none;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f2f5;
}

.todo-item:last-child {
  border-bottom: none;
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
  color: #2d3748;
}

.todo-title.done {
  text-decoration: line-through;
  color: #a0aec0;
}

.delete-btn {
  background: none;
  border: none;
  color: #fc8181;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
  flex-shrink: 0;
}

.delete-btn:hover {
  background: #fff5f5;
}

.status, .empty {
  text-align: center;
  color: #718096;
  padding: 20px 0;
}

.error {
  text-align: center;
  color: #e53e3e;
  padding: 10px;
  background: #fff5f5;
  border-radius: 6px;
  margin-bottom: 12px;
}
</style>