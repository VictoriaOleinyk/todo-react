import { useNavigate } from 'react-router'
import { Button, Container, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'

const About = () => {
	const navigate = useNavigate()

	return (
		<Container maxWidth={'sm'}>
			<Stack spacing={2}>
				<Typography variant="h2" component="div">
					About
				</Typography>
				<Typography variant="h6" component="div">
					Version 1.0.0
				</Typography>
				<Button variant="contained" onClick={() => navigate(-1)}>
					Назад
				</Button>
			</Stack>
		</Container>
	)
}

export default About
