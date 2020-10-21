import { combineReducers } from 'redux';
import {alert} from './alert.reducer';
import {user} from './users.reducer';
import {registration} from './registration.reducer';
import {authentication} from './authentication.reducer';

const rootReducer = combineReducers({
      user: user,
      alert: alert,
      registration: registration,
      authentication: authentication

});

export default rootReducer;