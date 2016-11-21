import axios from 'axios'

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
    last: user.last,
    github: user.github,
    facebook: user.facebook,
    twitter: user.twitter,
    linkedin: user.linkedin
  }
  return axios.post('/db/usersInfo', information1);
}

export const updateUser = user => {

  let pic =  user;

  axios.post('/pic', {pic: user}, { headers: { "authorization": "Bearer " + localStorage.getItem('id_token')}})
  .then(data => console.log(data));

  // return {
  //   type: 'UPDATE_CURRENT_USER'
  // }
}
