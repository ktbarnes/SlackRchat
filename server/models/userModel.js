var database = require('../db/db');

var User = {
  getUsers: function() {
    return database.select('about','email','facebook','first','github','id','last','linkedin','phone','twitter','username').from('users');
  },

  getUser: function(email) {
    return database.select('*').from('users').where({'email': email})
  },

  getUserByID: function(id) {
    return database.select('about','email','facebook','first','github','id','last','linkedin','phone','twitter','username').from('users').where({'id': id});
  },

  postUser: function(data) {
    return database('users')
    .insert({
      email: data.email,
      password: data.password,
      username: data.username,
    })
  },

  postOtherUserInformation: function(data) {
    console.log(data, 'this is the data from getting data from router');
    return database('users').where({'id': data.id})
    .update({
      first: data.first,
      last: data.last,
      phone: data.phone,
      about: data.about,
      github: data.github,
      facebook: data.facebook,
      twitter: data.twitter,
      linkedin: data.linkedin
    })
  },

  postProfilePicture: function(data) {
    console.log('inside postProfilePicture', data)
    return database('users').where({'id': data.id})
    .update({
      picture: data.picture
    })
  }
};

module.exports = User;