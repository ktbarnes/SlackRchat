/*
Note to reader:
UserActions is what's passed into the UserReducer, which stores the list of all users in this application. 
The functions here are to add a user to the reducer, to toggle a user's onlineToggle property on or off,
and to pass into the reducer the usernames of the users logged in. The info for that happens in AppContainer, 
where getAllLoggedInUsersFromSocket is called
*/

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
    phone: eachUser.phone,
    currentUserToggle: eachUser.currentUserToggle,
    onlineToggle: eachUser.onlineToggle
  };
};

export const toggleOnlineUser = (userUsername) => {
  return {
    type: "TOGGLE_ONLINE_USER",
    userUsername
  };
};

export const toggleOfflineUser = (userUsername) => {
  return {
    type: "TOGGLE_OFFLINE_USER",
    userUsername
  };
};

export const downloadOnlineUsers = (userUsername) => {
  return {
    type: "DOWNLOAD_ONLINE_USERS",
    userUsername
  };
};