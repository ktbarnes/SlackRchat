import { combineReducers } from 'redux'
import authReducer from './authReducer'
import ChatReducer from './ChatReducer'
import RoomReducer from './RoomReducer'
import UserReducer from './UserReducer'
import CurrentUserReducer from './CurrentUserReducer'
import CurrentRoomReducer from './CurrentRoomReducer'
import DMRoomReducer from './DMRoomReducer'
import signUpReducer from './signUpReducer'

export default combineReducers ({
  authReducer,
  ChatReducer,
  RoomReducer,
  UserReducer,
  CurrentUserReducer,
  CurrentRoomReducer,
  DMRoomReducer,
  signUpReducer
})