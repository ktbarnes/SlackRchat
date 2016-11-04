
var database = require('../db/db');

var User = {
  getUsers: function(){
    return database.select('*').from('users');
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