import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import './App.css';

import Homepage from './components/Homepage'
import { useDispatch } from 'react-redux'
//import {getProfileFetch} from './actions/userActions';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import NavigationBar from './components/nav/NavigationBar';
import { LandingPage } from './components/LandingPage';
import AuthRoute from './components/auth/AuthRoute';
//import PlaceShow from './components/PlaceShow'
//import SpotShow from './components/SpotShow'


const App = () => {
  const dispatch = useDispatch();
  

  // useEffect(() => {
  //     dispatch(getProfileFetch());
  // });

  
  return(
    <div className="App" >
      <BrowserRouter>
        <NavigationBar/>
        
        <Switch>
          <AuthRoute path="/login" type="guest">
            <Login />
          </AuthRoute>

          <AuthRoute path="/signup" type="guest">
            <Signup />
          </AuthRoute>

          <AuthRoute path="/private" type="private">
            <Homepage />
          </AuthRoute>

          {/* <AuthRoute path="/places/:id" type="private" component = {PlaceShow}/>

          <AuthRoute path="/spots/:id" type="private" component = {SpotShow}/> */}

          <AuthRoute path='/' type = "guest">
            <LandingPage />
          </AuthRoute>
        </Switch>
      </BrowserRouter>
    </div> 
  );
}

export default App