


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
    // console.log("user in toggleOnlineUser in UserActions",userEmail)
  return {
    type: "TOGGLE_ONLINE_USER",
    userUsername
  };
};

export const toggleOfflineUser = (userUsername) => {
    // console.log("user in toggleOnlineUser in UserActions",userEmail)
  return {
    type: "TOGGLE_OFFLINE_USER",
    userUsername
  };
};

export const downloadOnlineUsers = (userUsername) => {
    console.log("user in downloadOnlineUser in UserActions",userUsername)
  return {
    type: "DOWNLOAD_ONLINE_USERS",
    userUsername
  };
};