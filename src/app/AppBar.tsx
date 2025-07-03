import AppBar from '@mui/material/AppBar'
import { useThemeMode } from './ThemeContext'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Button, MenuItem, Stack, Tooltip } from '@mui/material'

import { useAppDispatch, useAppSelector } from './store.ts'
import { removeUser, selectUser } from '../entities/User/model/store/userStore.ts'
import { selectUndoneTodosLength } from '../entities/Todo/model/store/selectors/selectUnDoneTodos.ts'
import { NavLink, useLocation, useNavigate } from 'react-router'

const ButtonAppBar = () => {
	const { toggleColorMode, mode } = useThemeMode()
	const dispatch = useAppDispatch()
	const location = useLocation()

	const isAboutPage = location.pathname === '/about'
	const user = useAppSelector(selectUser)
	const username = user?.username
	const undoneCount = useAppSelector(selectUndoneTodosLength)

	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem('access_token')
		dispatch(removeUser())
		navigate('/auth')
	}
	const handleRedirectToProfile = () => {
		navigate('/profile')
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
								Todos {undoneCount}
							</Typography>
						)}

						<Typography variant="h6" component="div">
							<NavLink to={isAboutPage ? '/' : '/about'}>{isAboutPage ? 'Home' : 'About'}</NavLink>
						</Typography>
					</Stack>

					<IconButton color="inherit" onClick={toggleColorMode}>
						{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>

					{username && <MenuItem onClick={handleRedirectToProfile}>Profile</MenuItem>}

					{username ? (
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
					) : (
						<Button color="inherit" component={NavLink} to="/auth">
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default ButtonAppBar
