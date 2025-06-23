import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const ThemeModeContext = createContext({
	toggleColorMode: () => {},
	mode: 'light',
})

export const useThemeMode = () => useContext(ThemeModeContext)

export default function ThemeModeProvider({ children }: { children: React.ReactNode }) {
	// Читаем тему из localStorage, если есть, иначе 'light'
	const [mode, setMode] = useState<'light' | 'dark'>(() => {
		const saved = localStorage.getItem('theme-mode')
		return saved === 'dark' ? 'dark' : 'light'
	})

	// Сохраняем тему при каждом изменении
	useEffect(() => {
		localStorage.setItem('theme-mode', mode)
	}, [mode])

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
			},
			mode,
		}),
		[mode]
	)

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	)

	return (
		<ThemeModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeModeContext.Provider>
	)
}
