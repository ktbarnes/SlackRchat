export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function logoutUser() {
  dispatch(requestLogout())
  localStorage.removeItem('id_token')
  dispatch(receiveLogout())
}