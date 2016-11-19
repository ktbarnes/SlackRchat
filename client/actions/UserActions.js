


export const addUser = (eachUser) => {
  return {
    type: 'ADD_USER',
    id: eachUser.id,
    username: eachUser.username,
    email: eachUser.email,
    about: eachUser.about,
    first: eachUser.first,
    last: eachUser.last,
    github: eachUser.github,
    facebook: eachUser.facebook,
    twitter: eachUser.twitter,
    linkedin: eachUser.linkedin,
    currentUserToggle: eachUser.currentUserToggle,
    onlineToggle: eachUser.onlineToggle
  };
};

export const toggleOnlineUser = (userEmail) => {
    console.log("user in toggleOnlineUser in UserActions",userEmail)
  return {
    type: "TOGGLE_ONLINE_USER",
    userEmail
  };
};