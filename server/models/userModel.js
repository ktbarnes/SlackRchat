var database = require('../db/db');

var User = {
  getUsers: function() {
    return database.select('*').from('users').then(data => {
      // console.log(data);
      return data;
    });
  },
  getUser: function(email) {
    return database('users').where({'email': email});
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
    let match = data.email;
    return database('users').where('email', '=', match)
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
  }
};

module.exports = User;