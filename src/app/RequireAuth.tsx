import { Navigate, useLocation } from 'react-router'
import { selectUser } from '../entities/User/model/store/userStore.ts'
import { useAppSelector } from './store.ts'
import type { JSX } from 'react'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const user = useAppSelector(selectUser)
	const location = useLocation()

	if (!user) {
		const from = encodeURIComponent(location.pathname)
		return <Navigate to={`/auth/login?from=${from}`} replace />
	}

	return children
}

export default RequireAuth
