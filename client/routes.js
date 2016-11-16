import React from 'react'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'

import AppContainer from './src/AppContainer'
import Master from './src/master.js'
import Login from './src/login.js'
import SignUp from './src/signup.js'
import Profile from './src/signup.js'

function loggedIn() {
  return !!localStorage.id_token;
}

function requireAuth(nextState, replace) {
  if(!loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}

export default (
  <Route path='/' component={Master}>
    <IndexRoute component={AppContainer} onEnter={requireAuth} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Login} />
    <Route path='signup' component={SignUp} />
  </Route>
)