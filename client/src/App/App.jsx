import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux"
import { NavBar} from "../Navigation/Navigation"
import { history } from "../_helpers/history";
import { alertActions } from "../_actions/alert.actions";
import { AuthRoute } from "../_components/PrivateRoute";
import { HomePage } from "../HomePage/HomePage";
import { WelcomePage } from "../WelcomePage/WelcomePage";
import { LoginPage } from "../LoginPage/LoginPage";
import { RegisterPage } from "../RegisterPage/RegisterPage";
import { Alert} from "react-bootstrap"


export const App = () => {

    const dispatch = useDispatch()
    const alert = useSelector(state => state.alert)
    
    history.listen((action) => {
        console.log("history changed, alerts should be cleared")
        //clear alert on location change
        dispatch(alertActions.clear())
    });
    

    return (
         
            
            <Router history={history}>
                <NavBar />
                {alert.message &&
                <Alert variant={alert.type}>{alert.message}</Alert>
                }
                <Switch>
                    <AuthRoute path="/welcome" type="guest" component={WelcomePage} />
                    <AuthRoute path="/login" type="guest" component={LoginPage} />
                    <AuthRoute path="/register" type="guest" component={RegisterPage} />
                    
                    <AuthRoute exact path="/" type="private" component={HomePage} />
                    
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>    

            
        
    )
    
    
}

/* 
        <AuthRoute path='/login' type='guest'>
            <NewLogin />
          </AuthRoute>

          <AuthRoute path='/signup' type='guest'>
            <Signup />
          </AuthRoute>

          <AuthRoute path='/private' type='private'>
            <Homepage />
          </AuthRoute>

          <AuthRoute path='/places/:id' type='private' component={PlaceShow} />

          <AuthRoute path='/spots/:id' type='private' component={SpotShow} />

          <AuthRoute path='/' type='guest'> */