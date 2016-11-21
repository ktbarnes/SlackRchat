const ClickedUserProfileReducer = (state = {
  id: 0,
  username: "username",
  email: "email",
  about: "about",
  first: "first",
  last: "last",
  github: "github",
  facebook: "facebook",
  twitter: "twitter",
  linkedin: "linkedin",
  showModel: false
}, action) => {
  switch (action.type) {
    case 'CLICKED_USER_PROFILE_REQUEST':
      return Object.assign({}, state, {
        id: action.id,
        username: action.username,
        email: action.email,
        about: action.about,
        first: action.first,
        last: action.last,
        github: action.github,
        facebook: action.facebook,
        twitter: action.twitter,
        linkedin: action.linkedin
      })
    case 'OPEN_PROFILE_REQUEST':
      return Object.assign({}, state, {
        showModel: true
      }) 
    case 'CLOSE_PROFILE_REQUEST':
      return Object.assign({}, state, {
        showModel: false
      })  
    default:
      return state;
  }
}

export default ClickedUserProfileReducer
