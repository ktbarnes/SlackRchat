import axios from 'axios'
import { dispatch } from 'react-redux';

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

let config = {};
export function signupUser(creds) {
  config = {
    email: creds.username, 
    password: creds.password
  }
  return axios.post('/db/users', config);
}



export function sendProfileInfo(info){ 
    let information = {
      email: config.email,
      first: info.first,
      last: info.last,
      phone: info.phone,
      about: info.about,
      github: info.github,
      facebook: info.facebook,
      twitter: info.twitter,
      linkedin: info.linkedin
    }
    console.log(information, 'this is info in Action');
   return axios.post('/db/usersInfo', information); 
}

//will need to use above when converting to redux


