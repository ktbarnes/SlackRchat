const NavReducer = (state = {showModel:false}, action) => {
  switch (action.type) {
    case 'OPEN_PROFILE_REQUEST':
      return Object.assign({}, state, {
        showModel: true
      })

    default:
        return state;  
    }
}

export default NavReducer;
