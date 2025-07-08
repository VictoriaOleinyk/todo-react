import { Component } from 'react'
import AppBar from '../../../app/AppBar.tsx'
import { Outlet } from 'react-router'
import ErrorHandler from './ErrorHandler.tsx'

class Layout extends Component {
	render() {
		return (
			<>
				<AppBar />
				<div style={{ marginTop: '100px' }}>
					<ErrorHandler>
						<Outlet />
					</ErrorHandler>
				</div>
			</>
		)
	}
}

export default Layout
