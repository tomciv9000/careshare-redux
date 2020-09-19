import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div>
      <Navbar bg="light" expand="large">
        <Navbar.Brand>CareShare</Navbar.Brand>
      </Navbar>
      <Container fluid>
      <Row>
        <Col>1 of 1</Col>
      </Row>
    </Container>
  </div> 
    
  );
}

export default App;
