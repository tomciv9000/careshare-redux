import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { userActions } from '../_actions/user.actions';
import Button from 'react-bootstrap/Button'

export const HomePage = () => {
    const dispatch = useDispatch()
    const logout = userActions.logout

    const activeUser = useSelector(state => state.authentication.user)

    const handleClick = (event) => {
        event.preventDefault()
        dispatch(logout())
    }

    
    return (
        <div>
            <h1>C a r e S h a r e</h1>
            <h3>User Profile Page (Private)</h3>
            <p>Hello, {activeUser.uid}!</p>
            <Link to="/">
                <Button size="lg">Add Child</Button>
            </Link>
            <br/><br/>
            <p>
            <Button onClick={handleClick}variant="outline-primary" size="sm">Log Out</Button>
            </p>
        </div>
    )
}