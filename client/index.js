import React from 'react'
import ReactDOM, { render } from 'react-dom'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import ChatReducer from './reducers/ChatReducer'
import PrimaryChatroom from './src/app'
import SideBar from './src/sidebar.js'
import Test from './src/test.js'
import Test2 from './src/Test2.js'
import routes from './routes.js'

// const store = createStore(ChatReducer);


const store = createStore(
    combineReducers({
        ChatReducer,
        routing: routerReducer
    })
)

// const rootRoute = {
//   component: PrimaryChatroom,
//   path: '/',
//   indexRoute: {
//     getComponent (location, cb) {
//       require.ensure([], () => {
//         cb(null, require('./src/app'))
//       })
//     }
//   },
//   childRoutes: [
//     {
//       component: SideBar,
//       path: 'sidebar',
//       getComponent (location, cb) {
//         require.ensure([], () => {
//           cb(null, require('./src/sidebar'))
//         })
//       }
//     }
//   ]
// }

const history = syncHistoryWithStore(browserHistory, store)


const appRender = () => ReactDOM.render(

  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  , 
  document.getElementById('app')
)

appRender()
store.subscribe(appRender)


  // <Provider store={store}>
  //   <Router history={browserHistory}>
  //     <Route path='/' component={PrimaryChatroom} >
  //      <Route path='/logout' component={Logout} />
  //     </Route>
  //   </Router>
  // </Provider>

//    <Provider store={store}>
//    <Router routes={rootRoute} history={browserHistory} />
//  </Provider>
