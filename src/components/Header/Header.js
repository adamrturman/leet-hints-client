import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const authenticatedOptions = (
  // <Fragment>
  //   <Nav.Link href="#change-password">Change Password</Nav.Link>
  //   <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  //   <Nav.Link href="#challenges-create">Add a New Challenge</Nav.Link>
  //   <Nav.Link href="#challenges">View All Challenges</Nav.Link>
  // </Fragment>
  <Fragment>
    <NavDropdown title="Challenges" alignRight id="settings-dropdown">
      <NavDropdown.Item href="#challenges">View All Challenges</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#challenges-create">Add a New Challenge</NavDropdown.Item>
    </NavDropdown>
    <NavDropdown title="Options" alignRight id="settings-dropdown">
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="/#">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href="#">
      leet hints
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
