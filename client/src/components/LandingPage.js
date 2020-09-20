import React from 'react';
import logo from '../images/logo_white_transparent_crop.png'
import '../index.css';

export const LandingPage = () => {
  
  return (
    <div>
      <img src={logo} className="logo" alt="Stroll Logo" />
      
      <div className="black-banner">
        <b><h1 className="logotext display-1" id="stroll">S  t  r  o  l  l</h1></b>
        <h3 className="logotext" id="tagline">It's like a virtual memory lane.</h3>
      </div>

    </div>
  );
}