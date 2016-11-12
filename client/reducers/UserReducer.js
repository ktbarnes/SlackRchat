const UserReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_USER':
      return [
        ...state,
        {
          id: action.id,
          username: action.username,
          email: action.email
        },
      ];
    
    default:
      return state;
  }
};

export default UserReducer;