import { Container, Input, Stack } from '@mui/material'
import { Todo } from './Todo.tsx'
import { useState } from 'react'
import Button from '@mui/material/Button'
import type { TodoType } from '../model/todoType.ts'
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { addTodo, updateTodo, removeTodo, selectTodos } from '../model/store/useTodosStore.ts'

const Todos = () => {
	const [newTodoTitle, setNewTodoTitle] = useState('')
	const [newTodoDescription, setNewTodoDescription] = useState('')

	const dispatch = useAppDispatch()
	const todos = useAppSelector(selectTodos)

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value)
	}
	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value)
	}

	const handleAddTodo = () => {
		const newTodo: TodoType = {
			_id: Date.now().toString(),
			title: newTodoTitle,
			description: newTodoDescription,
			completed: false,
			createdAt: new Date().toString(),
			updatedAt: new Date().toString(),
			order: todos.length + 1,
		}
		dispatch(addTodo(newTodo))
		setNewTodoTitle('')
		setNewTodoDescription('')
	}

	return (
		<Container>
			<Input placeholder="title" value={newTodoTitle} onChange={handleTitleChange} />
			<Input placeholder="description" value={newTodoDescription} onChange={handleDescriptionChange} />
			<Button disabled={!newTodoTitle} onClick={handleAddTodo}>
				Add
			</Button>

			<Stack flexWrap="wrap" spacing={2} direction="row">
				{todos.map((todo) => (
					<Todo
						key={todo._id}
						todo={todo}
						setTodo={(t) => dispatch(updateTodo(t))}
						onDelete={(id) => dispatch(removeTodo(id))}
					/>
				))}
			</Stack>
		</Container>
	)
}

export default Todos
