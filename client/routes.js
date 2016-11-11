import React from 'react'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'

import AppContainer from './src/AppContainer'
import SideBar from './src/sidebar.js'
import Master from './src/master.js'
import Login from './src/login.js'
import Logout from './src/logout.js'

export default (
  <Route path="/" component={Master}>
    <IndexRoute component={AppContainer} />
    <Route path="Login" component={Login} />
    <Route path="Logout" component={Logout} />
  </Route>
)