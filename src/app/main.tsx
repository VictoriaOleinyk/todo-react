import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import CssBaseline from '@mui/material/CssBaseline'
import ThemeModeProvider from './ThemeContext.tsx'
import { SnackbarProvider } from 'notistack'
import { Provider } from 'react-redux'
import store from './store.ts'
import { BrowserRouter } from 'react-router'
import AppRoutes from './AppRoutes.tsx'
import ErrorHandler from '../entities/App/ui/ErrorHandler.tsx'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ErrorHandler>
			<Provider store={store}>
				<StrictMode>
					<SnackbarProvider>
						<ThemeModeProvider>
							<CssBaseline />
							<AppRoutes />
						</ThemeModeProvider>
					</SnackbarProvider>
				</StrictMode>
			</Provider>
		</ErrorHandler>
	</BrowserRouter>
)
