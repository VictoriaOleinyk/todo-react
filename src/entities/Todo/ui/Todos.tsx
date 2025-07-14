import { CircularProgress, Container, Input, Stack } from '@mui/material'
import { Todo } from './Todo.tsx'
import { useCallback, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import type { CreateTodoType, TodoType } from '../model/todoType.ts'
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { updateTodo, selectTodos, setTodos } from '../model/store/useTodosStore.ts'
import { addTodo, deleteTodo, getTodos, patchTodo } from '../../User/api/todoApi.ts'
import { useSnackbar } from 'notistack'
import { selectUser } from '../../User/model/store/userStore.ts'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CancelIcon from '@mui/icons-material/Cancel'
import { selectFilters } from '../model/store/useTodosStore'

const Todos = () => {
	const { enqueueSnackbar } = useSnackbar()
	const [isLoading, setIsLoading] = useState(true)
	const [showForm, setShowForm] = useState(false)
	const [newTodoTitle, setNewTodoTitle] = useState('')
	const [newTodoDescription, setNewTodoDescription] = useState('')
	const filters = useAppSelector(selectFilters)

	const dispatch = useAppDispatch()
	const todos = useAppSelector(selectTodos)
	const user = useAppSelector(selectUser)

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value)
	}
	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value)
	}

	const handleGetTodos = useCallback(async () => {
		setIsLoading(true)
		getTodos(filters)
			.then((todos) => {
				dispatch(setTodos(todos.data || []))
			})
			.catch(() => {
				enqueueSnackbar('error fetching todos', { variant: 'error' })
				dispatch(setTodos([]))
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [dispatch, enqueueSnackbar, filters])

	const handleAddTodo = useCallback(async () => {
		try {
			setIsLoading(true)
			if (!user?.access_token) return
			const newTodo: CreateTodoType = {
				title: newTodoTitle,
				description: newTodoDescription,
			}
			await addTodo(newTodo)
			await handleGetTodos()
			setNewTodoTitle('')
			setNewTodoDescription('')
			setShowForm(false)
		} catch (e) {
			console.error(e)
			enqueueSnackbar('Error adding todo', { variant: 'error' })
		} finally {
			setIsLoading(false)
		}
	}, [user?.access_token, newTodoTitle, newTodoDescription, handleGetTodos, enqueueSnackbar])

	const handleDeleteTodo = useCallback(
		async (id: string) => {
			try {
				if (!user?.access_token) return
				await deleteTodo(id)
				await handleGetTodos()
			} catch (e) {
				enqueueSnackbar('Error deleting todo', { variant: 'error' })
			}
		},
		[user?.access_token, handleGetTodos, enqueueSnackbar]
	)

	const handleUpdateTodo = useCallback(
		async (todo: TodoType) => {
			try {
				if (!user?.access_token) return
				await patchTodo(todo._id, todo)
				await handleGetTodos()
			} catch (e) {
				enqueueSnackbar('Error updating todo', { variant: 'error' })
			}
		},
		[user?.access_token, handleGetTodos, enqueueSnackbar]
	)

	const handleSetTodo = useCallback(
		(todo: TodoType) => {
			dispatch(updateTodo(todo))
		},
		[dispatch]
	)

	useEffect(() => {
		handleGetTodos()
	}, [handleGetTodos])

	if (isLoading) {
		return <CircularProgress />
	}

	return (
		<Container>
			{!showForm ? (
				<IconButton onClick={() => setShowForm(true)}>
					<AddCircleOutlineIcon fontSize="large" />
				</IconButton>
			) : (
				<Collapse in={showForm}>
					<Stack direction="row" spacing={1} alignItems="center">
						<Input placeholder="title" value={newTodoTitle} onChange={handleTitleChange} />
						<Input
							placeholder="description"
							value={newTodoDescription}
							onChange={handleDescriptionChange}
						/>
						<Button disabled={!newTodoTitle} onClick={handleAddTodo}>
							Add
						</Button>
						<IconButton
							onClick={() => {
								setShowForm(false)
								setNewTodoTitle('')
								setNewTodoDescription('')
							}}
						>
							<CancelIcon />
						</IconButton>
					</Stack>
				</Collapse>
			)}

			<Stack flexWrap="wrap" spacing={2} direction="row">
				{todos.map((todo) => (
					<Todo
						key={todo._id}
						todo={todo}
						setTodo={handleSetTodo}
						onDelete={handleDeleteTodo}
						onUpdate={handleUpdateTodo}
					/>
				))}
			</Stack>
		</Container>
	)
}

export default Todos
