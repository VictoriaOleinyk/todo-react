// Auth.tsx
import React, { useEffect } from 'react'
import { Container, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router'

const Auth = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const currentPath = location.pathname.endsWith('register') ? 'register' : 'login'

	const handleChange = (_: React.MouseEvent<HTMLElement>, newMode: string) => {
		if (newMode) {
			navigate(`/auth/${newMode}`)
		}
	}

	useEffect(() => {
		if (location.pathname === '/auth') {
			navigate('/auth/login')
		}
	}, [location.pathname, navigate])

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
