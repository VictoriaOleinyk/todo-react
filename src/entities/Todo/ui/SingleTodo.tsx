import { useEffect, useState, useCallback } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router'
import { getTodoById, patchTodo } from '../../User/api/todoApi.ts'
import type { TodoType } from '../model/todoType.ts'
import { Stack, Typography, TextField, Button, IconButton, CircularProgress } from '@mui/material'
import { formatDistance } from 'date-fns'
import { useSnackbar } from 'notistack'
import { Cancel, Save, Edit } from '@mui/icons-material'

const SingleTodo = () => {
	const { _id } = useParams<{ _id: string }>()
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()

	const [todo, setTodo] = useState<TodoType | null>(null)
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [isSaving, setIsSaving] = useState(false)

	// Загрузить тудушку
	useEffect(() => {
		if (!_id) return
		getTodoById(_id)
			.then((res) => {
				setTodo(res.data)
				setTitle(res.data.title)
				setDescription(res.data.description)
			})
			.catch(() => {
				enqueueSnackbar('Error loading todo', { variant: 'error' })
			})
	}, [_id, enqueueSnackbar])

	// Сохранить изменения
	const handleSave = useCallback(async () => {
		if (!todo) return
		setIsSaving(true)
		try {
			const updated: TodoType = { ...todo, title, description }
			await patchTodo(todo._id, updated)
			setTodo(updated)
			enqueueSnackbar('Todo updated', { variant: 'success' })
			setEditMode(false)
		} catch {
			enqueueSnackbar('Error saving changes', { variant: 'error' })
		} finally {
			setIsSaving(false)
		}
	}, [todo, title, description, enqueueSnackbar])

	if (!todo) {
		return (
			<Stack alignItems="center" mt={4}>
				<CircularProgress />
			</Stack>
		)
	}

	return (
		<Stack p={3} spacing={2}>
			<Stack direction="row" alignItems="center" spacing={1}>
				<IconButton onClick={() => navigate(-1)}>
					<Cancel />
				</IconButton>
				<NavLink to="..">Back</NavLink>
				<IconButton onClick={() => setEditMode((m) => !m)}>{editMode ? <Cancel /> : <Edit />}</IconButton>
			</Stack>

			{editMode ? (
				<>
					<TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
					<TextField
						label="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						fullWidth
						multiline
						rows={4}
					/>
					<Button variant="contained" startIcon={<Save />} onClick={handleSave} disabled={isSaving}>
						{isSaving ? 'Saving…' : 'Save'}
					</Button>
				</>
			) : (
				<>
					<Typography variant="h4">{todo.title}</Typography>
					<Typography>{todo.description}</Typography>
					<Typography color="text.secondary">Created: {new Date(todo.createdAt).toLocaleString()}</Typography>
					{todo.updatedAt && (
						<Typography color="text.secondary">
							Updated: {new Date(todo.updatedAt).toLocaleString()}
						</Typography>
					)}
					<Typography>Time since creation: {formatDistance(new Date(todo.createdAt), new Date())}</Typography>
					<Typography>Status: {todo.completed ? 'Completed' : 'Not completed'}</Typography>
				</>
			)}
		</Stack>
	)
}

export default SingleTodo
