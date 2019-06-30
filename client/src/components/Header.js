import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import "./Header.css"

const user = {
  username: "user",
  fullname: "User"
}

const Header = () => 
    <Navbar bg="dark" variant="dark" expand="sm" className="header">
        <Navbar.Brand><NavLink to="/">MCRS</NavLink></Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <Navbar.Text><NavLink to="/publish" className="pr-3">Publish</NavLink></Navbar.Text>
                <Navbar.Text><NavLink to="/find" className="pr-3">Find</NavLink></Navbar.Text>
                {user 
                  ? <Navbar.Text>
                      Signed in as: <NavLink to="/profile" className="user">{user.fullname}</NavLink>
                    </Navbar.Text>
                  : <Nav.Link><NavLink to="/sign-in">Sign In</NavLink></Nav.Link>
                }
            </Nav>
        </Navbar.Collapse>
  </Navbar>

export default Header