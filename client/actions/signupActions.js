import axios from 'axios'
import { dispatch } from 'react-redux';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export function createUser(id_token) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: id_token
  }
}

export function signupError() {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function signupUser(creds) {

  let config = {
    email: creds.username, 
    password: creds.password
  }

  return axios.post('/db/users', config);
}







