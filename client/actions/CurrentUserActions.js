import axios from 'axios'

export const setCurrentUser = user => {
  return {
    type: 'SET_CURRENT_USER',
    id: user.id,
    username: user.username,
    email: user.email,
    currentUserToggle: user.currentUserToggle
  };
};

export const updateUser = user => {

  let pic =  user;

  axios.post('/pic', {pic: pic})
  .then(data => console.log(data));

  // return {
  //   type: 'UPDATE_CURRENT_USER'
  // }
}