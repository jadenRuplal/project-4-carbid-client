import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown'
const linkStyle = {
    color: 'White',
    textDecoration: 'none',
	fontSize: '30px',

}
const linkStyleDrop = {
	color: 'Black',
    textDecoration: 'none',
	fontSize: '15px',
}

const authenticatedOptions = ({user}) => (
	<>
		<Nav.Link className='m-1' style={{padding: '8px',}}>
			<Link to='/cars' style={linkStyle}>
				Carbid
			</Link>
		</Nav.Link>
		<Nav.Item className='m-1' style={{padding: '8px',}}>
			<Link to='myCars' style={linkStyle}>
				My listings
			</Link>
		</Nav.Item>
		<Nav.Link className='m-1' style={{padding: '8px',}}>
			<Link to='/bids' style={linkStyle}>
				My bid
			</Link>
		</Nav.Link>
		<Nav.Item className='m-1' style={{padding: '8px',}}>
			<Link to='addCar' style={linkStyle}>
				Add listing
			</Link>
		</Nav.Item>


		<NavDropdown title={user.email} id="collasible-nav-dropdown" style={{ color: 'White', textDecoration: 'none',fontSize: '30px', }}>
              <NavDropdown.Item >
			  		<Link to='change-password' style={linkStyleDrop}>
						Change Password
					</Link>
			  </NavDropdown.Item>
              <NavDropdown.Item>
			 		<Link to='sign-out' style={linkStyleDrop}>
						Sign Out
					</Link>
              </NavDropdown.Item>
            </NavDropdown>
	</>
)

const unauthenticatedOptions = (
	<>
	<h1 style={linkStyle}> Welcome! </h1>
	<Link to="">
			Sign-in
	</Link>
	</>
)





const Header = ({ user }) => (
	<Navbar bg='dark' variant='dark' expand='md'>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user ? authenticatedOptions({user}) : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
