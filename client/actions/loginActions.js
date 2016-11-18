import axios from 'axios';

export function receiveLogin(id_token) {
  return {
    type: 'LOGIN_SUCCESS',
    isAuthenticated: true,
    id_token: id_token
  }
}

export function loginError(message) {
  return {
    type: 'LOGIN_FAILURE',
    isAuthenticated: false,
    message
  }
}

export function loginUser(creds) {

  let config = {
    email: creds.username, 
    password: creds.password
  }

  return axios.post('/db/login', config);
}