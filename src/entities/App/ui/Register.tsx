import { useState, type SyntheticEvent } from 'react'
import { Container, InputAdornment, Stack, TextField, IconButton, Button } from '@mui/material'
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import type { AxiosError } from 'axios'

import { useAppDispatch } from '../../../app/store.ts'
import { registerAndLogin } from '../../User/api/authApi.ts'
import { setUser } from '../../User/model/store/userStore.ts'
import { useNavigate } from 'react-router'

const Register = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const toggleShowPassword = () => setShowPassword((prev) => !prev)
	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setUsername(e.currentTarget.value)
	}
	const handlePasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setPassword(e.currentTarget.value)
	}

	const handleRegister = async () => {
		setLoading(true)
		try {
			const user = await registerAndLogin(username, password)

			localStorage.setItem('access_token', user.access_token)
			dispatch(setUser(user))

			enqueueSnackbar('Регистрация и вход успешны!', { variant: 'success' })
			navigate('/todos')
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>
			enqueueSnackbar(axiosError.response?.data.message || 'Ошибка регистрации', { variant: 'error' })
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container maxWidth="sm">
			<h2>Register</h2>
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
				<Button onClick={handleRegister} variant="contained" disabled={loading}>
					{loading ? 'Loading…' : 'Register'}
				</Button>
			</Stack>
		</Container>
	)
}

export default Register
