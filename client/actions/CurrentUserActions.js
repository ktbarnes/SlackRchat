import axios from 'axios';

export const setCurrentUser = user => {
  console.log('inside setCurrentUser action...', user)
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
    linkedin: user.linkedin
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
    linkedin: user.linkedin
  }
  return axios.post('/db/usersInfo', information1);
}

export const updateUserPicture = pic => {

  return axios.post('/pic', {pic: pic}, { headers: { "authorization": "Bearer " + localStorage.getItem('id_token')}});

}
