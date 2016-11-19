import React from 'react'
import ReactDOM, { render } from 'react-dom'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import allReducers from './reducers/index'
import routes from './routes.js'


// const logger = store => next => action => {
//   console.log('dispatching', action)
//   let result = next(action)
//   console.log('next state', store.getState())
//   return result
// }

// const crashReporter = store => next => action => {
//   try {
//     return next(action)
//   } catch (err) {
//     console.error('Caught an exception!', err)
//     Raven.captureException(err, {
//       extra: {
//         action,
//         state: store.getState()
//       }
//     })
//     throw err
//   }
// }

const store = createStore(
  combineReducers({
    allReducers,
    routing: routerReducer
  }),
  // applyMiddleware(logger, crashReporter)
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