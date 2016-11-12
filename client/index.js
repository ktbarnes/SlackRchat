import React from 'react'
import ReactDOM, { render } from 'react-dom'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import allReducers from './reducers/index'
import routes from './routes.js'

const store = createStore(
  combineReducers({
    allReducers,
    routing: routerReducer
  })
)

const history = syncHistoryWithStore(browserHistory, store)

const appRender = () => ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, 
  document.getElementById('app')
)

appRender()
store.subscribe(appRender)