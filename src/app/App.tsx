import './App.css'
import AppBar from './AppBar.tsx'
import { useEffect } from 'react'
import Auth from '../entities/User/ui/Auth.tsx'
import Todos from '../entities/Todo/ui/Todos.tsx'
import { autoLogin } from '../shared/util/autoLogin.ts'
import { useAppDispatch, useAppSelector } from './store.ts'
import { selectUser, setUser } from '../entities/User/model/store/userStore.ts'

function App() {
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectUser)

	useEffect(() => {
		const userFromLS = autoLogin()
		if (userFromLS && !user?.username) {
			dispatch(setUser(userFromLS))
		}
	}, [dispatch, user?.username])

	return (
		<>
			<AppBar username={user?.username} />
			<div style={{ marginTop: '100px' }}></div>
			{user ? <Todos /> : <Auth />}
		</>
	)
}

export default App
