import { combineReducers } from 'redux'
import authReducer from './authReducer'
import ChatReducer from './ChatReducer'

export default combineReducers ({
  authReducer,
  ChatReducer
})