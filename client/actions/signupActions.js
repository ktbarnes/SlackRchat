import axios from 'axios';

export function createUser(id_token) {
  return {
    type: 'SIGNUP_SUCCESS',
    isAuthenticated: true,
    id_token: id_token
  }
}

export function signupError() {
  return {
    type: 'SIGNUP_FAILURE',
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







