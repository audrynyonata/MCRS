import React from 'react'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import "./Header.css"

const user = {
  username: "user",
  fullname: "User"
}

const Header = () =>
  <Navbar bg="dark" variant="dark" expand="sm" className="header">
    <Navbar.Brand><NavLink to="/">MCRS</NavLink></Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <NavDropdown title="Browse" id="basic-nav-dropdown" className="pr-3">
          <NavLink to="/providers" className="dropdown-item" role="button">Providers</NavLink>
          <NavLink to="/method-chunks" className="dropdown-item" role="button">Method Chunks</NavLink>
          <NavLink to="/characteristics" className="dropdown-item" role="button">Characteristics</NavLink>
          <NavDropdown.Divider />
          <NavLink to="/projects" className="dropdown-item" role="button">My Projects</NavLink>
        </NavDropdown>
        <Navbar.Text><NavLink to="/publish" className="pr-3">Publish</NavLink></Navbar.Text>
        <Navbar.Text><NavLink to="/find" className="pr-3">Find</NavLink></Navbar.Text>
        {user
          ? <Navbar.Text>
            <NavLink to="/profile">Signed in as: <span className="user">{user.fullname}</span></NavLink>
          </Navbar.Text>
          : <Nav.Link><NavLink to="/sign-in">Sign In</NavLink></Nav.Link>
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>

export default Header