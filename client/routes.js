import React from 'react'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'

import AppContainer from './src/AppContainer'
import SideBar from './src/sidebar.js'
import Master from './src/master.js'
import Login from './src/login.js'
import Logout from './src/logout.js'

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
  <Route path="/" component={Master}>
    <IndexRoute component={AppContainer} onEnter={requireAuth} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
  </Route>
)