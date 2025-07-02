import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TodoType } from '../todoType'
import { mockTodos } from '../mockTodos.ts'

type TodoState = {
	todos: TodoType[]
}

const initialState: TodoState = {
	todos: mockTodos,
}

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<TodoType>) => {
			state.todos.unshift(action.payload)
		},
		setTodos: (state, action: PayloadAction<TodoType[]>) => {
			state.todos = action.payload
		},
		updateTodo: (state, action: PayloadAction<TodoType>) => {
			state.todos = state.todos.map((t) => (t._id === action.payload._id ? action.payload : t))
		},
		removeTodo: (state, action: PayloadAction<string>) => {
			state.todos = state.todos.filter((t) => t._id !== action.payload)
		},
	},
})

export const { addTodo, setTodos, updateTodo, removeTodo } = todoSlice.actions
export const selectTodos = (state: { todos: TodoState }) => state.todos.todos
export default todoSlice.reducer
