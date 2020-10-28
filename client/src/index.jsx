import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers/store';
import { App } from './App/App';
import "./login.css"
import "bootstrap/dist/css/bootstrap.min.css";



render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);