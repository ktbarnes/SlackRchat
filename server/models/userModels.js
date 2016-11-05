
var database = require('../db/db');

var User = {
  getUsers: function(){
    return database.select('*').from('users');
  },
  getUser: function(email) {
    return database.select('*').from('users').where('email', email);
  },
  postUser: function(data){
    return database('users')
    .insert({
      username: data.username,
      email: data.email,
      password: data.password
    })
  }
};

module.exports = User;