import { Card, CardActions, CardContent, Checkbox, IconButton, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import type { TodoType } from '../model/todoType'
import { Delete, Edit, Save } from '@mui/icons-material'

type TodoProps = {
	todo: TodoType
	setTodo?: (todo: TodoType) => void
	onDelete: (id: string) => void
}
export const Todo = ({ todo, setTodo, onDelete }: TodoProps) => {
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState(todo.title)
	const [description, setDescription] = useState(todo.description)

	const handleCheckClick = () => {
		setTodo?.({ ...todo, completed: !todo.completed })
	}

	const handleSave = () => {
		setTodo?.({ ...todo, title, description })
		setEditMode(false)
	}

	return (
		<Card variant="outlined" sx={{ maxWidth: 200 }}>
			<CardContent>
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
							{todo.title}
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
