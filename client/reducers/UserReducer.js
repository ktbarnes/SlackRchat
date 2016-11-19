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
          currentUserToggle: action.currentUserToggle,
          onlineToggle: action.onlineToggle
        },
      ]

    case 'TOGGLE_ONLINE_USER':
      return state.map( (eachUser) => {
        if(eachUser.email === action.userEmail){
          return Object.assign({},eachUser,{
            onlineToggle: !eachUser.onlineToggle
          });
        }
        return eachUser
      })
    
    default:
      return state;
  }
};

export default UserReducer;