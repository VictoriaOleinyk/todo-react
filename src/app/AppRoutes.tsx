import { Route, Routes } from 'react-router'
import App from './App.tsx'
import About from '../entities/App/ui/About.tsx'
import NotFound from '../entities/App/ui/NotFound.tsx'
import Layout from '../entities/App/ui/Layout.tsx'
import Login from '../entities/App/ui/Login.tsx'
import Register from '../entities/App/ui/Register.tsx'
import Auth from '../entities/User/ui/Auth.tsx'
import Todos from '../entities/Todo/ui/Todos.tsx'
import Profile from '../entities/User/ui/Profile.tsx'

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<App />} />
				<Route path="/auth" element={<Auth />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="/profile" element={<Profile />} />
				<Route path="/todos" element={<Todos />} />
				<Route path={'/about'} element={<About />} />
				<Route path={'*'} element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default AppRoutes
