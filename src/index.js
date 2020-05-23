/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute/privateRoute';
// core components
import Admin from 'layouts/Admin.js';
import RTL from 'layouts/RTL.js';
import LoginPage from 'views/Login/Login';
import RegisterPage from 'views/Register/Register';
import 'assets/css/material-dashboard-react.css?v=1.8.0';
import { Provider } from 'react-redux';
import configStore from './redux/configStore.redux';
import './style.css';
const hist = createBrowserHistory();
const store = configStore();
ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <PrivateRoute path="/admin" component={Admin} />
        <Route path="/rtl" component={RTL} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
