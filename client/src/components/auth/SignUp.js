import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {userPostFetch} from '../../actions/userActions';
import { useDispatch } from 'react-redux';

import "./login.css";

function ValidationMessage(props) {
  if (!props.valid) {
    return(
      <div className='error-msg'>{props.message}</div>
    )
  }
  return null;
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const [errorMsg, setErrorMsg] = useState({})

  const dispatch = useDispatch()

  const validateForm = () => {
    setFormValid(emailValid && passwordValid)
    
  }

  const handleSubmit = event => {
      event.preventDefault()
      let newUserObj = {
          email: email,
          password: password,
          passwordConfirm: passwordConfirm
      }
      console.log("Sign-Up User Data:", newUserObj) 
      dispatch(userPostFetch(newUserObj))
      setEmail("")
      setPassword("")
      setPasswordConfirm("")
  }

  useEffect(() => {
    if(password.length > 7 && emailValid) {
      validateForm()
    }
  })

  const updateEmail = (email) => {
    setEmail(email) 
    validateEmail()
  }

  const validateEmail = () => {
    setEmailValid(true)
    setErrorMsg({...errorMsg})
    // checks for format _@_._
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      setEmailValid(false);
      setErrorMsg({...errorMsg, email:"Invalid email format"})
    }

    validateForm()
  }

  const updatePassword = (password) => {
    setPassword(password) 
    
    setPasswordValid(true)
    setErrorMsg({})

    if (password.length < 7) {
      setPasswordValid(false)
      setErrorMsg({password:'Password must be at least 7 characters long'})
     
    } else if (!/\d/.test(password)){
      setPasswordValid(false)
      setErrorMsg({password:'Password must contain a digit'})

    } else if (!/[!@#$%^&*]/.test(password)){
      setPasswordValid(false)
      setErrorMsg({password:'Password must contain special character: !@#$%^&*'})
    }

    validateForm();
  }

  const updatePasswordConfirm = (passwordConfirm) => {
    setPasswordConfirm(passwordConfirm) 
    
    setPasswordConfirmed(true)
    setErrorMsg({})
    
    if (passwordConfirm !== password){
      setPasswordConfirmed(false);
      setErrorMsg({passwordConfirm:'Passwords do not match.'})
    }

    validateForm();
  }

  
  return (
    <div className="Login">
      <h3  id="account-login">Create Account</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="large">
          <Form.Label >Email</Form.Label>
          < ValidationMessage valid={emailValid} message={errorMsg.email} />
          <Form.Control
            autoFocus
            
            type="email"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" size="large">
          <Form.Label >Password</Form.Label>
          < ValidationMessage valid={passwordValid} message={errorMsg.password} />
          <Form.Control
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
            type="password"
          />
        </Form.Group>

        <Form.Group controlId="passwordConfirm" size="large">
          <Form.Label >Confirm Password</Form.Label>
          < ValidationMessage valid={passwordConfirmed} message={errorMsg.passwordConfirm} />
          <Form.Control
            value={passwordConfirm}
            onChange={(e) => updatePasswordConfirm(e.target.value)}
            type="password"
          />
        </Form.Group>

        <Button block size="large" disabled={!formValid} type="submit">
          Login
        </Button>
      </Form> 
    </div>
  )
}