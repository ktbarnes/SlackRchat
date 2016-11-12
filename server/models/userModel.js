var database = require('../db/db');

var User = {
  getUsers: function() {
    return database.select('*').from('users').then(data => {
      console.log(data);
      return data;
    });
  },
  getUser: function(email) {
    return database('users').where({'email': email});
  },
  postUser: function(data) {
    return database('users')
    .insert({
      username: data.username,
      email: data.email,
      password: data.password
    })
  },
  // updateUser: function(data) {

  // }
};

module.exports = User;