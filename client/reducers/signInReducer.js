const signInReducer = (state = {isFetching: false, isAuthenticated: !!localStorage.getItem('id_token')}, action) => {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case 'SIGNUP_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case 'SIGNUP_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case 'SIGNUP_SUCCESS':
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state;
  }
}

export default signInReducer