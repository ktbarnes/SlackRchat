import React from 'react'
import ReactDOM, { render } from 'react-dom'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import ChatReducer from './reducers/ChatReducer'
import PrimaryChatroom from './src/app'

const store = createStore(ChatReducer);

console.log(store.getState());

//lets you dispatch actions that change the state of the applications
// store.dispatch( { type: "SOMETYPE"} );

//lets you register a callback that redux will call any time an action has been dispatched
//so that you can update the UI of the application to reflect the application state
// store.subscribe ( () =>  {});
  

// store.subscribe(function(){

//   // ReactDOM.render(
    
//   //   // browserHistory provides the history state.
//   //   // There is also a hashHistory object which makes urls with hashes,
//   //   // similar to Angular
//   //   <Provider store={store}>
//   //     <Router history={browserHistory} >
//   //       <Route path='/' component={PrimaryChatroom} state = {store.getState()} />
//   //     </Router>
//   //   </Provider>
    
//   //   , 
//   //   document.getElementById('app')
//   // )

// });


  // ReactDOM.render(
  //   <Provider store={store}>
  //     <PrimaryChatroom 
  //       state={store.getState()}
  //     />
  //   </Provider>
    
  //   , 
  //   document.getElementById('app')
  // )


const appRender = () => ReactDOM.render(
    <Provider store={store}>
      <PrimaryChatroom 
        value={store.getState()}
      />
      </Provider>
    , 
    document.getElementById('app')
)

appRender()
store.subscribe(appRender)

// ReactDOM.render(
  
  // browserHistory provides the history state.
  // There is also a hashHistory object which makes urls with hashes,
  // similar to Angular
//   <Router history={browserHistory}>
//     <Provider store={store}>
//       <Route path='/' component={PrimaryChatroom} />
//       <Route path='/login' component={Login} />
//       <Route path='signUp' component={SignUp} />
//       <Route path='/logout' component={Logout} />
//     </Provider>
//   </Router>
//   , 
//   document.getElementById('app')
// )
>>>>>>> profile
