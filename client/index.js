import React from 'react'
import ReactDOM, { render } from 'react-dom'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import ChatReducer from './reducers/ChatReducer'
import allReducers from './reducers/index'
import PrimaryChatroom from './src/app'
import SideBar from './src/sidebar.js'
import Test from './src/test.js'
import Test2 from './src/Test2.js'
import routes from './routes.js'

const store = createStore(
    combineReducers({
        allReducers,
        routing: routerReducer
    })
)

const history = syncHistoryWithStore(browserHistory, store)

console.log('WHAT IS THE STORE ', store);

const appRender = () => ReactDOM.render(

  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  , 
  document.getElementById('app')
)

appRender()
store.subscribe(appRender)