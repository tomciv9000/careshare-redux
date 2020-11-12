import React from "react";
import { Router, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { NavBar} from "../Navigation/Navigation"
import { history } from "../_helpers/history";
import { alertActions } from "../_actions/alert.actions";
import { AuthRoute } from "../_components/PrivateRoute";
import { HomePage } from "../HomePage/HomePage";
import { WelcomePage } from "../WelcomePage/WelcomePage";
import { LoginPage } from "../LoginPage/LoginPage";
import { RegisterPage } from "../RegisterPage/RegisterPage";
import { NewChildForm } from '../NewChildForm/NewChildForm' 
import { Alert} from "react-bootstrap"


export const App = () => {

    const dispatch = useDispatch()
    const alert = useSelector(state => state.alert)
    
    history.listen((action) => {
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