import React from 'react';
import {render} from 'react-dom';
import {fromJS} from 'immutable';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
// import {combineReducers} from 'redux-immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducer from './Reducers';
import App from './App';

let initialState = fromJS(window.state);

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));

render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
