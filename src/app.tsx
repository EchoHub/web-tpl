import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router-dom';
import R, { history } from './pages/routers';
import './app.scss';
import { createStore, combineReducers } from 'redux';
// @ts-ignore
import { Provider } from 'react-redux';
// const VConsole = require('vconsole')
// new VConsole();

//@ts-ignore
function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text]);
        default:
            return state;
    }
}
function counter(state = 0, action: { [key: string]: any }) {
    switch (action.type) {
        case 'add':
            return state + 1;
        case 'reduce':
            return state - 1;
        default:
            return state;
    }
}
let store = createStore(combineReducers({ todos, counter }), { todos: ['Use Redux'] })
store.dispatch({
    type: 'add',
    text: 'Read the docs'
})

console.log(store.getState())
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {
                R.map((conf, index) =>
                    <Route key={index} exact={index === 0} path={conf.path} component={conf.component} />
                )
            }
        </Router>
    </Provider>,
    document.getElementById('app'),
);
