import { Card, CardActions, CardContent, Checkbox, IconButton, TextField, Typography } from '@mui/material'
import { useState, memo } from 'react'
import type { TodoType } from '../model/todoType'
import { Delete, Edit, Save } from '@mui/icons-material'
import { NavLink } from 'react-router'

type TodoProps = {
	todo: TodoType
	setTodo?: (todo: TodoType) => void
	onDelete: (id: string) => void
	onUpdate: (todo: TodoType) => void
}

const TodoComponent = ({ todo, setTodo, onDelete, onUpdate }: TodoProps) => {
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState(todo.title)
	const [description, setDescription] = useState(todo.description)

	const handleCheckClick = () => {
		const updated = { ...todo, completed: !todo.completed }
		setTodo?.(updated)
		onUpdate(updated)
	}

	const handleSave = () => {
		const updated = { ...todo, title, description }
		setTodo?.(updated)
		onUpdate(updated)
		setEditMode(false)
	}

	return (
		<Card variant="outlined" sx={{ maxWidth: 200 }}>
			<CardContent>
				<Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right' }}>
					created: {new Date(todo.createdAt).toLocaleString()}
				</Typography>
				{todo.updatedAt && (
					<Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'right' }}>
						updated: {new Date(todo.updatedAt).toLocaleString()}
					</Typography>
				)}

				{editMode ? (
					<>
						<TextField
							label="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							variant="standard"
							fullWidth
							margin="dense"
						/>
						<TextField
							label="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							variant="standard"
							fullWidth
							margin="dense"
							multiline
							rows={2}
						/>
					</>
				) : (
					<>
						<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
							<NavLink to={`/todo/${todo._id}`}>{todo.title} </NavLink>
						</Typography>
						<Typography variant="body2">{todo.description}</Typography>
					</>
				)}
			</CardContent>
			<CardActions>
				<Checkbox checked={todo.completed} size="small" onClick={handleCheckClick} />
				<IconButton onClick={editMode ? handleSave : () => setEditMode(true)}>
					{editMode ? <Save /> : <Edit />}
				</IconButton>
				<IconButton onClick={() => onDelete(todo._id)}>
					<Delete />
				</IconButton>
			</CardActions>
		</Card>
	)
}

export const Todo = memo(TodoComponent)
