import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch } from "react-router-dom";

import AddChildForm from './components/AddChildForm'
import HomePage from './components/HomePage'
import { useDispatch } from 'react-redux'
//import {getProfileFetch} from './actions/userActions';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import NavigationBar from './components/NavBar';
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
            <SignUp />
          </AuthRoute>

          <AuthRoute path="/private" type="private">
            <HomePage />
          </AuthRoute>

          {/* <AuthRoute path="/places/:id" type="private" component = {PlaceShow}/>

          <AuthRoute path="/spots/:id" type="private" component = {SpotShow}/> */}

          <AuthRoute path='/' type = "guest">
            <AddChildForm />
          </AuthRoute>
        </Switch>
      </BrowserRouter>
    </div> 
  );
}

export default App