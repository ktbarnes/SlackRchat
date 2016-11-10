import axios from 'axios'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function loginUser(creds) {

  let config = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `users=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    dispatch(requestLogin(creds))

    return axios.post('/db/login', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
          ).then(({ user, response }) => {
            if(!response.ok) {
              dispatch(loginError(user.message))
              return Promise.reject(user)
            }
            else {
              localStorage.setItem('id_token', user.id_token)
              dispatch(receiveLogin(user))
            }
          }).catch(err => console.error(err))

    // return fetch('/login', config)
    //   .then(response =>
    //     response.json().then(user => ({ user, response }))
    //       ).then(({ user, response }) => {
    //         if(!response.ok) {
    //           dispatch(loginError(user.message))
    //           return Promise.reject(user)
    //         }
    //         else {
    //           localStorage.setItem('id_token', user.id_token)
    //           dispatch(receiveLogin(user))
    //         }
    //       }).catch(err => console.error(err))
  }
}