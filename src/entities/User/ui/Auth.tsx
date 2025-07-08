// Auth.tsx
import React from 'react'
import { Container, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router'
import { selectUser } from '../model/store/userStore.ts'
import { useAppSelector } from '../../../app/store.ts'

const Auth = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const user = useAppSelector(selectUser)
	const currentPath = location.pathname.endsWith('register') ? 'register' : 'login'

	const handleChange = (_: React.MouseEvent<HTMLElement>, newMode: string) => {
		if (newMode) {
			navigate(`/auth/${newMode}`)
		}
	}

	// useEffect(() => {
	// 	if (location.pathname === '/auth') {
	// 		navigate('/auth/login')
	// 	}
	// }, [location.pathname, navigate])

	if (user) {
		return <Navigate to={'/'} />
	}

	return (
		<Container maxWidth="sm">
			<Stack spacing={2} sx={{ mt: 4 }}>
				<ToggleButtonGroup value={currentPath} exclusive onChange={handleChange} fullWidth>
					<ToggleButton value="login">Login</ToggleButton>
					<ToggleButton value="register">Register</ToggleButton>
				</ToggleButtonGroup>

				<Outlet />
			</Stack>
		</Container>
	)
}

export default Auth
