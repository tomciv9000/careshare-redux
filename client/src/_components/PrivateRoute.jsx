import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'


// export const PrivateRoute = ({ component: Component, ...rest }) => (
    
//     <Route {...rest} render={props => (
//         localStorage.getItem('user')
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// )
export const AuthRoute = props => {
    const isAuthenticated = useSelector(state => state.authentication.loggedIn) 
    const { type } = props;
    
    if (type === "guest" && isAuthenticated) return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
    else if (type === "private" && !isAuthenticated) return <Redirect to={{ pathname: '/welcome', state: { from: props.location } }} />;
  
    return <Route {...props} />;
};