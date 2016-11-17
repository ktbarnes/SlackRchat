const UserReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_USER':
      return [
        ...state,
        {
          id: action.id,
          username: action.username,
          email: action.email,
          about: action.about,
          first: action.first,
          last: action.last,
          github: action.github,
          facebook: action.facebook,
          twitter: action.twitter,
          linkedin: action.linkedin,
          currentUserToggle: action.currentUserToggle
        },
      ];
    
    default:
      return state;
  }
};

export default UserReducer;