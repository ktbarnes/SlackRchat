import axios from 'axios';
import { dispatch } from 'react-redux';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  console.log("INSIDE REQUEST LOGIN ", creds)
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function receiveLogin(id_token) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: id_token
  }
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser(creds) {

  // const dispatch = { dispatch };
  // console.log('this is dispath within loginUser ', dispatch)

  let config = {
    email: creds.username, 
    password: creds.password
  }

  console.log("INSIDE loginActions ", config)

  // return dispatch => {
    // dispatch(requestLogin(creds))
    // console.log("INSIDE FIRST LAYER ", dispatch)
  return axios.post('/db/login', config)
  // }

}