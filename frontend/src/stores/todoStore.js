import { defineStore } from 'pinia'
import api from '../services/api.js'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false,
    error: null,
  }),

  getters: {
    sortedTodos: (state) => {
      return [...state.todos].sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1
        }
        return 0
      })
    },

    totalCount: (state) => state.todos.length,
    completedCount: (state) => state.todos.filter(t => t.completed).length,
    activeCount: (state) => state.todos.filter(t => !t.completed).length,
    
    progress: (state) => {
      if (state.todos.length === 0) return 0
      return Math.round((state.completedCount / state.todos.length) * 100)
    },
  },

  actions: {
    async fetchTodos() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/todos')
        this.todos = response.data
      } catch (e) {
        this.error = 'Не удалось загрузить задачи'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async addTodo(title, priority = 'medium') {
      try {
        const response = await api.post('/todos', { title, priority })
        this.todos.unshift(response.data)
        return response.data
      } catch (e) {
        this.error = 'Не удалось добавить задачу'
        console.error(e)
        throw e
      }
    },

    async toggleTodo(todo) {
      try {
        const response = await api.put(`/todos/${todo.id}`, {
          completed: !todo.completed
        })
        const index = this.todos.findIndex(t => t.id === todo.id)
        this.todos[index] = response.data
      } catch (e) {
        this.error = 'Не удалось обновить задачу'
        console.error(e)
      }
    },

    async deleteTodo(id) {
      try {
        await api.delete(`/todos/${id}`)
        this.todos = this.todos.filter(t => t.id !== id)
      } catch (e) {
        this.error = 'Не удалось удалить задачу'
        console.error(e)
      }
    },

    async updateTodo(id, data) {
      try {
        const response = await api.put(`/todos/${id}`, data)
        const index = this.todos.findIndex(t => t.id === id)
        this.todos[index] = response.data
        return response.data
      } catch (e) {
        this.error = 'Не удалось обновить задачу'
        console.error(e)
        throw e
      }
    },
  }
})