import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LandingPage } from './components/LandingPage';
//import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


function App() {
  return (
  <div>
      <LandingPage />
  </div> 
    
  );
}

export default App;
