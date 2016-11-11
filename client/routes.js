import React from 'react'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'

import PrimaryChatroom from './src/app'
import SideBar from './src/sidebar.js'
import Test from './src/test.js'
import Test2 from './src/Test2.js'
import Master from './src/master.js'
import Login from './src/login.js'
import Logout from './src/logout.js'

export default (
  <Route path="/" component={Master}>
    <IndexRoute component={PrimaryChatroom} />
    <Route path="test2" component={Test2} />
    <Route path="Login" component={Login} />
    <Route path="Logout" component={Logout} />
  </Route>
)