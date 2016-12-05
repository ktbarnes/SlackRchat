const authReducer = (state = {isAuthenticated: !!localStorage.getItem('id_token')}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: ''
      })
    case 'LOGIN_FAILURE':
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.message
      })
    case 'LOGOUT_SUCCESS':
      return Object.assign({}, state, {
        isAuthenticated: false
      })
    default:
      return state;
  }
}

export default authReducer
