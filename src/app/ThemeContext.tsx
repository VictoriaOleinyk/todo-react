import React, { createContext, useContext, useMemo, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

export type ThemeMode = 'light' | 'dark'
interface ThemeModeContextType {
	toggleColorMode: () => void
	mode: ThemeMode
}

const ThemeModeContext = createContext<ThemeModeContextType>({
	toggleColorMode: () => {},
	mode: 'light',
})

export const useThemeMode = () => useContext(ThemeModeContext)

const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [mode, setMode] = useState<ThemeMode>('light')

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
			mode,
		}),
		[mode]
	)

	const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

	return (
		<ThemeModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeModeContext.Provider>
	)
}

export default ThemeModeProvider
