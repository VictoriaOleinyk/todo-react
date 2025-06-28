import { Card, CardActions, CardContent, Checkbox, IconButton, Stack, TextField, Typography } from '@mui/material'
import { Edit, Save } from '@mui/icons-material'
import { useState } from 'react'
import type { TodoType } from '../model/todoType.ts'
import { mockTodos } from '../model/mockTodos.ts'

type TodoProps = {
	todo: TodoType
	setTodo: (todo: TodoType) => void
}

const Todo = ({ todo, setTodo }: TodoProps) => {
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState(todo.title)
	const [description, setDescription] = useState(todo.description)

	const handleCheckClick = () => {
		setTodo({ ...todo, completed: !todo.completed })
	}

	const handleSave = () => {
		setTodo({ ...todo, title, description })
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
			</CardActions>
		</Card>
	)
}

const Todos = () => {
	const [todos, setTodos] = useState<TodoType[]>(mockTodos)

	const setTodo = (todo: TodoType) => {
		const updatedTodos = todos.map((t) => (t._id === todo._id ? todo : t))
		setTodos(updatedTodos)
	}

	return (
		<Stack flexWrap="wrap" spacing={2} direction="row">
			{todos.map((todo) => (
				<Todo key={todo._id} todo={todo} setTodo={setTodo} />
			))}
		</Stack>
	)
}

export default Todos
