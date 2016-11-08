import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
// import allReducers from './reducers/'
import { createStore } from 'redux'
import PrimaryChatroom from './src/app'

// const store = createStore();

// console.log(store.getState());

//lets you dispatch actions that change the state of the applications
// store.dispatch( { type: "SOMETYPE"} );

//lets you register a callback that redux will call any time an action has been dispatched
//so that you can update the UI of the application to reflect the application state
// store.subscribe ( () =>  {});
  
ReactDOM.render(

    // browserHistory provides the history state.
    // There is also a hashHistory object which makes urls with hashes,
    // similar to Angular
    <Router history={browserHistory}>
      <Route path='/' component={PrimaryChatroom} />
    </Router>
 , 
  document.getElementById('app')
)
