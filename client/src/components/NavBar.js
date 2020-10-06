import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOutUser } from '../actions/userActions';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from "react-router-bootstrap"

class NavigationBar extends Component {

  handleClick = event => {
      console.log("clicked")
    // event.preventDefault()
    // localStorage.removeItem("token")
    // this.props.signOutUser()
  }

  // callUser = () => {
  //   if (this.props.currentUser){
  //     console.log("current user found", this.props.currentUser)
  //     return (<p>User: {this.props.currentUser.email}</p>)
  //   }else {
  //     return (<p>Guest</p>)
  //   }
  // }

  render() {
    const userLinks = (
      <Nav>
        <Navbar.Text>
          User: {this.props.currentUser.email}
        </Navbar.Text>
        <LinkContainer to="/">
        <Nav.Link onClick={this.handleClick}>Log Out</Nav.Link>
        </LinkContainer>
      </Nav>
    )

    const guestLinks = (
      <Nav>
        <LinkContainer to="/signup">
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
        <Navbar.Collapse>
          {this.props.isAuthenticated ? userLinks : guestLinks}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    currentUser: state.user.currentUser
  };
}

const mapDispatchToProps = dispatch => ({
    signOutUser: () => dispatch(signOutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
