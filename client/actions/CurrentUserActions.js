/*
Note to reader: This is a reducer we set up to capture the "current" user in the 
application. 
This is the result of the initial POST request that happens in AppContainer to the /db/getMe 
endpoint, which is the process where the user's local token from localStorage is sent to the 
database for a comparison of user IDs, and the resulting response from the server is the user's full
info. 

There's also logic here for the user to update his profile and/or profile picture

The corresponding reducer to this action is the CurrentUserReducer.js file
*/

import axios from 'axios';

export const setCurrentUser = user => {
  return {
    type: 'SET_CURRENT_USER',
    id: user.id,
    username: user.username,
    picture: user.picture,
    email: user.email,
    about: user.about,
    first: user.first,
    last: user.last,
    github: user.github,
    facebook: user.facebook,
    twitter: user.twitter,
    linkedin: user.linkedin,
    phone: user.phone,
    admin: user.admin,
  };
};

export const UpdateProfile = user => {
  let information1 = {
    type: 'UPDATE_PROFILE',
    id: user.id,
    username: user.username,
    email: user.email,
    about: user.about,
    first: user.first,
    picture: user.picture,
    last: user.last,
    github: user.github,
    facebook: user.facebook,
    twitter: user.twitter,
    linkedin: user.linkedin,
    phone: user.phone
  }
  return axios.post('/db/usersInfo', information1);
}

export const updateUserPicture = pic => {

  return axios.post('/pic', {pic: pic}, { headers: { "authorization": "Bearer " + localStorage.getItem('id_token')}});

}
