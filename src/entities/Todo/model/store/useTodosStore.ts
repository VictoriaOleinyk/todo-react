import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { mockTodos } from '../mockTodos.ts'
import type { TodoType } from '../todoType.ts'

type TodosState = {
	todos: TodoType[]
	addTodo: (newTodo: TodoType) => void
	setTodos: (todos: TodoType[]) => void
	updateTodo: (updated: TodoType) => void
	removeTodo: (id: string) => void
}

export const useTodosStore = create<TodosState>()(
	devtools((set) => {
		return {
			todos: mockTodos,
			addTodo: (newTodo: TodoType) => set((state) => ({ todos: [newTodo, ...state.todos] })),
			setTodos: (todos: TodoType[]) => set({ todos }),
			updateTodo: (updated: TodoType) =>
				set((state) => ({
					todos: state.todos.map((t) => (t._id === updated._id ? updated : t)),
				})),
			removeTodo: (id: string) =>
				set((state) => ({
					todos: state.todos.filter((todo) => todo._id !== id),
				})),
		}
	})
)
