import { AccountCircle } from '@mui/icons-material'
import './App.css'
import AppBar from './AppBar.tsx'
import { Container, InputAdornment, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { type SyntheticEvent, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

function App() {
	const [user, setUser] = useState<{ access_token: string; username: string } | null>(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [loginFormName, setLoginFormName] = useState('login')
	const [showPassword, setShowPassword] = useState(false)

	const toggleShowPassword = () => setShowPassword((prev) => !prev)

	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setUsername(e.currentTarget.value)
	}
	const handlePasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setPassword(e.currentTarget.value)
	}
	const handleLogin = async () => {
		setLoading(true)
		const loginResponse = await fetch('https://todos-be.vercel.app/auth/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const loginData = (await loginResponse.json()) as { access_token: string; username: string }
		const accessToken = loginData.access_token

		console.log(jwtDecode(accessToken))
		localStorage.setItem('accessToken', accessToken)

		setLoading(false)
		setUser(loginData)
	}

	const handleRegister = async () => {
		setLoading(true)
		await fetch('https://todos-be.vercel.app/auth/register', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		setLoading(false)
	}
	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setLoginFormName(newAlignment)
	}

	return (
		<>
			<AppBar username={user?.username}></AppBar>
			<div style={{ marginTop: '100px' }}></div>

			<Container maxWidth={'sm'}>
				<ToggleButtonGroup
					disabled={loading}
					size="small"
					color="primary"
					value={loginFormName}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					fullWidth
					sx={{ marginBottom: 2 }}
				>
					<ToggleButton value="login">Login</ToggleButton>
					<ToggleButton value="register">Register</ToggleButton>
				</ToggleButtonGroup>

				{loginFormName === 'login' ? (
					<Stack spacing={2}>
						<TextField
							disabled={loading}
							value={username}
							onChange={handleUserNameChange}
							size={'small'}
							label="email"
							variant="filled"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							disabled={loading}
							value={password}
							onChange={handlePasswordChange}
							size="small"
							label="password"
							type={showPassword ? 'text' : 'password'}
							variant="filled"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={toggleShowPassword} edge="end">
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<Button onClick={handleLogin} variant="contained" loadingPosition={'start'} loading={loading}>
							{loading ? 'Loading' : 'Login'}
						</Button>
					</Stack>
				) : (
					<Stack spacing={2}>
						<TextField
							disabled={loading}
							value={username}
							onChange={handleUserNameChange}
							size={'small'}
							label="email"
							variant="filled"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							disabled={loading}
							value={password}
							onChange={handlePasswordChange}
							size="small"
							label="password"
							type={showPassword ? 'text' : 'password'}
							variant="filled"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={toggleShowPassword} edge="end">
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<Button
							onClick={handleRegister}
							variant="contained"
							loadingPosition={'start'}
							loading={loading}
						>
							{loading ? 'Loading' : 'Register'}
						</Button>
					</Stack>
				)}
			</Container>
		</>
	)
}

export default App
