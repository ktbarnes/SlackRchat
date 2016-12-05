import axios from 'axios';

export function createUser(id_token) {
  return {
    type: 'SIGNUP_SUCCESS',
    isAuthenticated: true,
    id_token: id_token
  }
}

export function signupError() {
  return {
    type: 'SIGNUP_FAILURE',
    isAuthenticated: false,
    message
  }
}

//dont delete this...it needs to be global
let config = {}
export function signupUser(creds) {
  config = {
    email: creds.email, 
    username: creds.username,
    password: creds.password
  }
  // console.log(config, 'this is the email julia')
  return axios.post('/db/users', config);
}


export function sendProfileInfo(info){ 
  console.log(config, 'this is the email julia')
  console.log(info, 'this is the other info julia')
  let information = {
    email: config.email,
    first: info.first,
    last: info.last,
    phone: info.phone,
    about: info.about,
    github: info.github,
    facebook: info.facebook,
    twitter: info.twitter,
    linkedin: info.linkedin
  }
  console.log(information, 'this is the other info julia')
  return axios.post('/db/usersInfoInitial', information); 
}

// export const addProfilePicture(info) {
//   let pic1 = info;
//   axios.post('/pic', {pic:})
// }

export const updateUserPictureInitial = pic => {

  return axios.post('/pic', {pic: pic}, { headers: { "authorization": "Bearer " + localStorage.getItem('id_token')}});

}








//will need to use above when converting to redux


