import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeModeProvider from './ThemeContext.tsx'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import store from './store.ts'

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<StrictMode>
			<SnackbarProvider>
				<ThemeModeProvider>
					<CssBaseline />
					<App />
				</ThemeModeProvider>
			</SnackbarProvider>
		</StrictMode>
	</Provider>
)
