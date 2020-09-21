import React, { Component } from 'react';

import { connect } from 'react-redux';
//import { logoutUser } from '../../actions/userActions';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from "react-router-bootstrap"

class NavigationBar extends Component {

  handleClick = event => {
      console.log("clicked")
    // event.preventDefault()
    // localStorage.removeItem("token")
    // this.props.logoutUser()
  }

  callUser = () => {
    if (this.props.current_user){
      return (<p>User: {this.props.current_user.email}</p>)
    }else {
      return (<p>Guest</p>)
    }
  }

  render() {
    const userLinks = (
      <Nav>
        <LinkContainer to="/">
        <Nav.Link onClick={this.handleClick}>Log Out</Nav.Link>
        </LinkContainer>
      </Nav>
    )

    const guestLinks = (
      <Nav>
        <LinkContainer to="/signup">
          <Nav.Link>Sign Up</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
          <Nav.Link>Log in</Nav.Link>
        </LinkContainer>
      </Nav>
    )

    return (
      <Navbar  bg= "dark" variant="dark" expand="lg">
        <Navbar.Brand>
          CareShare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {this.props.auth ? userLinks : guestLinks}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.user.isAuthenticated,
    current_user: state.user.currentUser
  };
}

// const mapDispatchToProps = dispatch => ({
//     logoutUser: () => dispatch(logoutUser())
// })

export default connect(mapStateToProps, null)(NavigationBar);
