//Note to reader: this is the corresponding reducer for the UserActions file

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
          phone: action.phone,
          currentUserToggle: action.currentUserToggle,
          onlineToggle: action.onlineToggle
        },
      ]

    case 'TOGGLE_ONLINE_USER':
      return state.map( (eachUser) => {
        if(eachUser.username === action.userUsername){
          return Object.assign({},eachUser,{
            onlineToggle: true
          });
        }
        return eachUser
      })

    case 'TOGGLE_OFFLINE_USER':
      return state.map( (eachUser) => {
        if(eachUser.username === action.userUsername){
          return Object.assign({},eachUser,{
            onlineToggle: false
          });
        }
        return eachUser
      })

    case 'DOWNLOAD_ONLINE_USERS':
      return state.map( (eachUser) => {
        if(eachUser.username === action.userUsername){
          return Object.assign({},eachUser,{
            onlineToggle: true
          });
        }
        return eachUser
      })
    
    default:
      return state;
  }
};

export default UserReducer;