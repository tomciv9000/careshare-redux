import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux"
import { NavBar} from "../Navigation/Navigation"
import { history } from "../_helpers/history";
import { alertActions } from "../_actions/alert.actions";
import { PrivateRoute } from "../_components/PrivateRoute";
import { HomePage } from "../HomePage/HomePage";
import { LoginPage } from "../LoginPage/LoginPage";
import { RegisterPage } from "../RegisterPage/RegisterPage";
import { Alert} from "react-bootstrap"


export const App = () => {

    const dispatch = useDispatch()
    const alert = useSelector(state => state.alert)
    
    
    history.listen((location, action) => {
     // clear alert on location change
      dispatch(alertActions.clear)
    });
    

    return (
         
            
            <Router history={history}>
                <NavBar />
                {alert.message &&
                <Alert variant={alert.type}>{alert.message}</Alert>
                }
                <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Redirect from="*" to="/" />
                </Switch>
            </Router>    

            
        
    )
    
    
}