import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers/store';
import { App } from './App/App';

import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css"



render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);