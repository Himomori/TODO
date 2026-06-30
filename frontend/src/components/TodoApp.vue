<template>
  <div class="todo-container">
    <TodoStats />

    <TodoForm @add="handleAdd" :loading="store.loading" />

    <div v-if="store.loading" class="status">⏳ Загрузка...</div>
    <div v-else-if="store.error" class="error">{{ store.error }}</div>
    
    <TodoList 
      v-else-if="store.sortedTodos.length > 0"
      :todos="store.sortedTodos"
      @toggle="store.toggleTodo"
      @edit="startEdit"
      @delete="startDelete"
    />

    <div v-else class="empty">
      🎉 Все задачи выполнены! Отдыхайте.
    </div>

    <TodoEditModal
      v-if="editingTodo"
      :todo="editingTodo"
      :mode="modalMode"
      @save="handleSaveEdit"
      @delete="handleDelete"
      @close="editingTodo = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '../stores/todoStore.js'
import TodoStats from './TodoStats.vue'
import TodoForm from './TodoForm.vue'
import TodoList from './TodoList.vue'
import TodoEditModal from './TodoEditModal.vue'

const store = useTodoStore()
const editingTodo = ref(null)
const modalMode = ref('edit')

onMounted(() => {
  store.fetchTodos()
})

async function handleAdd({ title, priority }) {
  await store.addTodo(title, priority)
}

function startEdit(todo) {
  editingTodo.value = todo
  modalMode.value = 'edit'
}

function startDelete(todo) {
  editingTodo.value = todo
  modalMode.value = 'delete'
}

async function handleSaveEdit({ id, title, priority }) {
  await store.updateTodo(id, { title, priority })
  editingTodo.value = null
}

async function handleDelete(id) {
  await store.deleteTodo(id)
  editingTodo.value = null
}
</script>

<style scoped>
.todo-container {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.status,
.empty {
  text-align: center;
  color: #718096;
  padding: 30px 0;
  font-size: 16px;
}

.error {
  text-align: center;
  color: #dc2626;
  padding: 12px;
  background: #fee2e2;
  border-radius: 8px;
  margin-bottom: 12px;
}

@media (max-width: 500px) {
  .todo-container {
    padding: 16px;
  }
}
</style>