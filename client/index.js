import React from 'react'
import ReactDOM, { render } from 'react-dom'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import ChatReducer from './reducers/ChatReducer'
import PrimaryChatroom from './src/app'

const store = createStore(ChatReducer);

const appRender = () => ReactDOM.render(

  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={PrimaryChatroom} />
    </Router>
  </Provider>
  , 
  document.getElementById('app')
)

appRender()
store.subscribe(appRender)