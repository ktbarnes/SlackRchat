import React from 'react'
import { render } from 'react-dom' //not using ReactDOM
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import allReducers from './reducers/index'
import routes from './routes.js'

/*
Note to reader:
This is the primary entry point for the application. It 
instantiates the Redux store and sets up the React Router

Routes are listed in routes.js
*/

const store = createStore(
  combineReducers({
    allReducers,
    routing: routerReducer
  })
)

const history = syncHistoryWithStore(browserHistory, store)

const appRender = () => render( //not ReactDOM.render
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, 
  document.getElementById('app')
)

appRender()
store.subscribe(appRender)