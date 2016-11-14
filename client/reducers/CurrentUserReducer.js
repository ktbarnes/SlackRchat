const CurrentUserReducer = (state = [], action) => {
  switch (action.type) {

    case 'SET_CURRENT_USER':
      return [
        ...state,
        {
          id: action.id,
          username: action.username,
          email: action.email,
          currentUserToggle: action.currentUserToggle
        },
      ];
    
    default:
      return state;
  }
};

export default CurrentUserReducer;