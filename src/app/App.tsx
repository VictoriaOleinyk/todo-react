import './App.css'
import AppBar from './AppBar.tsx'
import { useEffect } from 'react'
import Auth from '../entities/User/ui/Auth.tsx'
import { useUserStore } from '../entities/User/model/store/useUserStore.ts'
import Todos from '../entities/Todo/ui/Todos.tsx'
import { autoLogin } from '../shared/util/autoLogin.ts'

function App() {
	const userFromLS = autoLogin()

	// zustand store
	const user = useUserStore((state) => state.user)
	const setUser = useUserStore((state) => state.setUser)

	useEffect(() => {
		if (userFromLS) {
			setUser(userFromLS)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<AppBar username={user?.username} />
			<div style={{ marginTop: '100px' }}></div>
			{user ? <Todos /> : <Auth />}
		</>
	)
}

export default App
