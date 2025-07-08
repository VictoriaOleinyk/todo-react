import { useState, type SyntheticEvent } from 'react'
import { Container, InputAdornment, Stack, TextField, IconButton, Button } from '@mui/material'
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import type { AxiosError } from 'axios'
import { rootApi } from '../../../shared/rootApi.ts'

import { jwtDecode } from 'jwt-decode'
import { useAppDispatch } from '../../../app/store.ts'
import type { UserType } from '../../User/model/userType.ts'
import { setUser } from '../../User/model/store/userStore.ts'
import { useLocation, useNavigate } from 'react-router'

const Login = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const { enqueueSnackbar } = useSnackbar()
	const navigate = useNavigate()
	const location = useLocation()
	const params = new URLSearchParams(location.search)
	const from = params.get('from') || '/'

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
			dispatch(setUser(response.data))

			enqueueSnackbar('Welcome back!', { variant: 'success' })

			navigate(from, { replace: true })
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>
			enqueueSnackbar(axiosError.response?.data.message || 'Unknown error', { variant: 'error' })
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container maxWidth="sm">
			<h2>Login</h2>
			<Stack spacing={2}>
				<TextField
					disabled={loading}
					value={username}
					onChange={handleUserNameChange}
					size="small"
					label="Email"
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
					label="Password"
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
				<Button onClick={handleLogin} variant="contained" disabled={loading}>
					{loading ? 'Loading…' : 'Login'}
				</Button>
			</Stack>
		</Container>
	)
}

export default Login
