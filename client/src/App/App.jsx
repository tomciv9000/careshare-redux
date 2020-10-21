import React, { useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
//import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
//import { history } from '../_helpers/history';
import { alertActions } from '../_actions/alert.actions';
import { PrivateRoute } from '../_components/PrivateRoute';
import { HomePage } from '../HomePage/HomePage';
import { LoginPage } from '../LoginPage/LoginPage';
import { RegisterPage } from '../RegisterPage/RegisterPage';
import { Container, Jumbotron} from 'react-bootstrap'

const App = () => {
    const history = useHistory()
    const location = useLocation()
    const dipatch = useDispatch()
    const alert = useSelector(state => state.alert)
    
    const clearAlerts = alertActions.clear
    
    useEffect(() => {
        history.listen(dispatch(clearAlerts()))
    }, [])

    return (
        <Jumbotron>

        </Jumbotron>
    )
    
    
}





// class App extends Component {
//     constructor(props) {
//         super(props);

//         history.listen((location, action) => {
//             // clear alert on location change
//             this.props.clearAlerts();
//         });
//     }

//     render() {
//         const { alert } = this.props;
//         return (
//             <div className="jumbotron">
//                 <div className="container">
//                     <div className="col-sm-8 col-sm-offset-2">
//                         {alert.message &&
//                             <div className={`alert ${alert.type}`}>{alert.message}</div>
//                         }
//                         <Router history={history}>
//                             <Switch>
//                                 <PrivateRoute exact path="/" component={HomePage} />
//                                 <Route path="/login" component={LoginPage} />
//                                 <Route path="/register" component={RegisterPage} />
//                                 <Redirect from="*" to="/" />
//                             </Switch>
//                         </Router>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// function mapState(state) {
//     const { alert } = state;
//     return { alert };
// }

// const actionCreators = {
//     clearAlerts: alertActions.clear
// };

// const connectedApp = connect(mapState, actionCreators)(App);
// export { connectedApp as App };