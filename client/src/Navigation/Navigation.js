import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch } from "react-redux";
import { userActions } from "../_actions/user.actions";


export const NavBar = () => {
  const dispatch = useDispatch()
  const logout = userActions.logout
  
  const activeUser = useSelector(state => state.authentication.user)
  
  const handleNavClick = (event) => {
    console.log("Nav Logout clicked")
    event.preventDefault()
    dispatch(logout())
  }


  const userLinks = (
    <Nav>
      <Navbar.Text>
        {!!activeUser ? `Account: ${activeUser.uid}` : "Guest"} 
      </Navbar.Text>
      <LinkContainer to="/">
        <Nav.Link onClick={handleNavClick}>Log Out</Nav.Link>
      </LinkContainer>
    </Nav>
  )

  const guestLinks = (
    <Nav>
      <LinkContainer to="/register">
        <Nav.Link>Create Account</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/login">
        <Nav.Link>Sign in</Nav.Link>
      </LinkContainer>
    </Nav>
  )

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Brand>
          CareShare
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {!!activeUser ? userLinks : guestLinks}
        </Navbar.Collapse>
      </Navbar>
  )
}
