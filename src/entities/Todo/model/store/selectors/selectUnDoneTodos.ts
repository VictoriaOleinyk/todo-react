import { createSelector } from '@reduxjs/toolkit'
import { selectTodos } from '../useTodosStore.ts'

export const selectUnDoneTodos = createSelector([selectTodos], (todos) => todos.filter((todo) => !todo.completed))

export const selectUndoneTodosLength = createSelector([selectUnDoneTodos], (todos) => todos.length)
