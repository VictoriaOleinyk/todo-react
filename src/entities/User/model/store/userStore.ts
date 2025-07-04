import { createSlice } from '@reduxjs/toolkit'
import type { UserType } from '../userType.ts'

type UserStore = {
	user: UserType | null
	isLoading: boolean
}

const initialState: UserStore = {
	user: null,
	isLoading: false,
}

export const userStore = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
		removeUser: (state) => {
			state.user = null
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload
		},
	},
	selectors: {
		selectUser: (state: UserStore) => state.user,
		selectIsLoading: (state: UserStore) => state.isLoading,
	},
})

export const { setUser, removeUser, setIsLoading } = userStore.actions
export const { selectUser, selectIsLoading } = userStore.selectors
