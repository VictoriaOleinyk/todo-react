import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TodoType } from '../todoType'

export type TodosType = {
	todos: TodoType[]
	filters: {
		completed: 'true' | 'false' | 'all'
		page: number
		limit: number
		search?: string
	}
}

const initialState: TodosType = {
	todos: [],
	filters: {
		limit: 5,
		page: 1,
		completed: 'all',
	},
}

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		setTodos: (state, action: PayloadAction<TodoType[]>) => {
			state.todos = action.payload
		},
		updateTodo: (state, action: PayloadAction<TodoType>) => {
			state.todos = state.todos.map((t) => (t._id === action.payload._id ? action.payload : t))
		},
		setLimit: (state, action) => {
			state.filters.limit = action.payload
		},
		setPage: (state, action) => {
			state.filters.page = action.payload
		},
		setCompletedFilter: (state, action: PayloadAction<'all' | 'true' | 'false'>) => {
			state.filters.completed = action.payload
		},
		setSearch: (state, action) => {
			state.filters.search = action.payload
		},
	},
})

export const { setTodos, updateTodo, setCompletedFilter, setPage, setSearch, setLimit } = todoSlice.actions
export const selectTodos = (state: { todos: TodosType }) => state.todos.todos
export const selectFilters = (state: { todos: TodosType }) => state.todos.filters
export default todoSlice.reducer
