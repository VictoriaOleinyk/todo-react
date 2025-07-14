import { rootApi } from '../../../shared/api/rootApi.ts'
import type { CreateTodoType, TodoType } from '../../Todo/model/todoType.ts'
import type { TodosType } from '../../Todo/model/store/useTodosStore.ts'

export const getTodos = async (filters: TodosType['filters']) => {
	let queryParams = `?page=${filters.page}&limit=${filters.limit}`
	if (filters.completed !== 'all') {
		queryParams += `&completed=${filters.completed}`
	}
	if (filters.search) {
		queryParams += `&search=${encodeURIComponent(filters.search)}`
	}

	return await rootApi.get<TodoType[]>(`/todos${queryParams}`)
}

export const addTodo = async (todo: CreateTodoType) => {
	return await rootApi.post<TodoType>('/todos', todo)
}

export const deleteTodo = async (id: string) => {
	return await rootApi.delete(`/todos/${id}`)
}

export const patchTodo = async (id: string, data: Partial<TodoType>) => {
	return await rootApi.patch<TodoType>(`/todos/${id}`, data, {})
}

export const getTodoById = async (todoId: string) => {
	return await rootApi.get<TodoType>(`/todos/${todoId}`)
}
