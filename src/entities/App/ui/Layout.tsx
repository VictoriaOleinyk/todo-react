import { Component } from 'react'
import AppBar from '../../../app/AppBar.tsx'
import { Outlet } from 'react-router'

class Layout extends Component {
	render() {
		return (
			<>
				<AppBar />
				<div style={{ marginTop: '100px' }}>
					<Outlet />
				</div>
			</>
		)
	}
}

export default Layout
