import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'black',
    textDecoration: 'none',

}
const authenticatedOptions = (
	<>
		<Nav.Link>
			<Link to='/cars' style={linkStyle}>
				Carbid
			</Link>
		</Nav.Link>
		<Nav.Item>
			<Link to='myCars' style={linkStyle}>
				My listings
			</Link>
		</Nav.Item>
		<Nav.Link>
			<Link to='/bids' style={linkStyle}>
				My bid
			</Link>
		</Nav.Link>
		<Nav.Item>
			<Link to='addCar' style={linkStyle}>
				Add listing
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
	<h1> Welcome! </h1>
	</>
)





const Header = ({ user }) => (
	<Navbar bg='primary' variant='dark' expand='md'>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
