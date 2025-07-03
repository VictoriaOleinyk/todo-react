import { useAppSelector } from '../../../app/store.ts'
import { selectUser } from '../model/store/userStore.ts'
import { jwtDecode } from 'jwt-decode'
import { Avatar, Card } from '@mui/material'
import Typography from '@mui/material/Typography'

const Profile = () => {
	const user = useAppSelector(selectUser)

	if (!user) return null

	const decoded = jwtDecode<{ exp?: number }>(user.access_token)
	const tokenUntil = decoded.exp ? new Date(decoded.exp * 1000).toLocaleString() : 'Unknown'

	return (
		<Card sx={{ padding: 2 }}>
			<Avatar>{user.username.slice(0, 1).toLocaleLowerCase()}</Avatar>
			<Typography>{user.username}</Typography>
			<Typography>{tokenUntil}</Typography>
		</Card>
	)
}

export default Profile
