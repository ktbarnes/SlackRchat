const CurrentUserReducer = (state = {id: 0, username: '', email: '', about: '', first: '', last: '', github: '', facebook: '', twitter: '', linkedin: ''}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return Object.assign({}, state, {
          id: action.id,
          username: action.username,
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