import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import R, { history } from './pages/routers';
import './app.scss';
// const VConsole = require('vconsole')
// new VConsole();
ReactDOM.render(
    <Router history={history}>
        {
            R.map((conf, index) =>
                <Route key={index} exact={index === 0} path={conf.path} component={conf.component} />
            )
        }
    </Router>,
    document.getElementById('app'),
);
