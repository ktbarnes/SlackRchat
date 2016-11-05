import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'

import PrimaryChatroom from './src/app'

ReactDOM.render(
  // browserHistory provides the history state.
  // There is also a hashHistory object which makes urls with hashes,
  // similar to Angular
  <Router history={browserHistory}>
    <Route path='/' component={PrimaryChatroom} />
  </Router>
  , document.getElementById('app'))
