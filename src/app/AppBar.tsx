import AppBar from '@mui/material/AppBar'
import { useThemeMode } from './ThemeContext'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Button, Stack, Tooltip } from '@mui/material'

import { useAppDispatch, useAppSelector } from './store.ts'
import { removeUser } from '../entities/User/model/store/userStore.ts'
import { selectTodos } from '../entities/Todo/model/store/useTodosStore.ts'

type Props = {
	access_token?: string
	username?: string
}

const ButtonAppBar = ({ username }: Props) => {
	const { toggleColorMode, mode } = useThemeMode()
	const todos = useAppSelector(selectTodos)
	const undoneTodos = todos.filter((todo) => !todo.completed)
	const dispatch = useAppDispatch()

	const handleLogout = () => {
		localStorage.removeItem('access_token')
		dispatch(removeUser())
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>

					<Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
						{username && (
							<Typography variant="h6" component="div">
								Todos {undoneTodos.length}
							</Typography>
						)}
						<Typography variant="h6" component="div">
							About
						</Typography>
					</Stack>

					<IconButton color="inherit" onClick={toggleColorMode}>
						{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>

					{username && (
						<>
							<Button color="inherit" onClick={handleLogout}>
								Logout
							</Button>
							<Tooltip title={username}>
								<Avatar src={''} alt={username}>
									{username[0]}
								</Avatar>
							</Tooltip>
						</>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default ButtonAppBar
