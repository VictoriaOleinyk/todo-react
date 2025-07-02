import React, { useState, type SyntheticEvent } from 'react'
import { Container, InputAdornment, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { AccountCircle } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import type { AxiosError } from 'axios'
import { registerAndLogin } from '../api/authApi'
import { setUser } from '../model/store/userStore.ts'
import type { UserType } from '../model/userType.ts'
import { rootApi } from '../../../shared/rootApi.ts'
import { jwtDecode } from 'jwt-decode'
import { useAppDispatch } from '../../../app/store.ts'

const Auth = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [loginFormName, setLoginFormName] = useState('login')
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useAppDispatch()

	const toggleShowPassword = () => setShowPassword((prev) => !prev)
	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setUsername(e.currentTarget.value)
	}
	const handlePasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setPassword(e.currentTarget.value)
	}
	const handleLogin = async () => {
		setLoading(true)
		try {
			const response = await rootApi.post<UserType>('/auth/login', {
				username,
				password,
			})

			const accessToken = response.data.access_token
			localStorage.setItem('access_token', accessToken)

			console.warn(jwtDecode(accessToken))
			const setUserAction = setUser(response.data)
			console.log(setUserAction)
			dispatch(setUser(response.data)) // <-- как в твоём примере

			enqueueSnackbar('Welcome back!', { variant: 'success' })
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>
			enqueueSnackbar(axiosError.response?.data.message || 'Unknown error', { variant: 'error' })
		} finally {
			setLoading(false)
		}
	}

	const handleRegister = async () => {
		setLoading(true)
		try {
			const user = await registerAndLogin(username, password)

			const accessToken = user.access_token
			localStorage.setItem('access_token', accessToken)

			dispatch(setUser(user))

			enqueueSnackbar('Регистрация и вход успешны!', { variant: 'success' })
			setLoginFormName('login')
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>
			enqueueSnackbar(axiosError.response?.data.message || 'Ошибка регистрации', { variant: 'error' })
		} finally {
			setLoading(false)
		}
	}

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setLoginFormName(newAlignment)
	}

	return (
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
					<Button onClick={handleRegister} variant="contained" loadingPosition={'start'} loading={loading}>
						{loading ? 'Loading' : 'Register'}
					</Button>
				</Stack>
			)}
		</Container>
	)
}

export default Auth
