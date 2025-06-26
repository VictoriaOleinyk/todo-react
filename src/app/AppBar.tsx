import AppBar from '@mui/material/AppBar'
import { useThemeMode } from './ThemeContext'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Stack, Tooltip } from '@mui/material'

type Props = {
	access_token?: string
	username?: string
}

const ButtonAppBar = (props: Props) => {
	const { username } = props
	const { toggleColorMode, mode } = useThemeMode()

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>

					<Stack direction={'row'} spacing={2} style={{ flexGrow: 1 }}>
						{username && (
							<Typography variant="h6" component="div">
								Todos
							</Typography>
						)}
						<Typography variant="h6" component="div">
							About
						</Typography>
					</Stack>

					<Button color="inherit">Login</Button>
					{username ? (
						<Tooltip title={username}>
							<Avatar src={''} alt={username}>
								{username[0]}
							</Avatar>
						</Tooltip>
					) : (
						<IconButton color="inherit" onClick={toggleColorMode}>
							{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default ButtonAppBar
