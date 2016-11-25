/*
Note to reader:
This is the corresponding reducer to the CurrentUserActions. 
Note the reducer is initialized with blank properties
*/

const CurrentUserReducer = (state = {
  id: 0, 
  username: '', 
  phone:'', 
  email: '', 
  about: '', 
  picture:'', 
  first: '', 
  last: '', 
  github: '', 
  facebook: '', 
  twitter: '', 
  linkedin: ''
}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return Object.assign({}, state, {
          id: action.id,
          username: action.username,
          phone: action.phone,
          picture: action.picture,
          email: action.email,
          about: action.about,
          first: action.first,
          last: action.last,
          github: action.github,
          facebook: action.facebook,
          twitter: action.twitter,
          linkedin: action.linkedin
      })
    default:
      return state;
  }
};

export default CurrentUserReducer;