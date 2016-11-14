import { combineReducers } from 'redux'
import authReducer from './authReducer'
import ChatReducer from './ChatReducer'
import RoomReducer from './RoomReducer'
import signInReducer from './signInReducer'

export default combineReducers ({
  authReducer,
  ChatReducer,
  RoomReducer,
  signInReducer
})