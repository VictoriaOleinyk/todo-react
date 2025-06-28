import { rootApi } from '../../../shared/rootApi'
import type { UserType } from '../model/userType'
import { jwtDecode } from 'jwt-decode'

export const login = async (username: string, password: string): Promise<UserType> => {
	const response = await rootApi.post<UserType>('/auth/login', { username, password })
	const accessToken = response.data.access_token
	localStorage.setItem('access_token', accessToken)
	console.warn(jwtDecode(accessToken))
	return response.data
}

export const registerAndLogin = async (username: string, password: string): Promise<UserType> => {
	await rootApi.post('/auth/register', { username, password })
	return await login(username, password)
}
