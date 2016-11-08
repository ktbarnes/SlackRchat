
var database = require('../db/db');

var User = {
  getUsers: function(){
    return database.select('*').from('users');
  },
  getUser: function(email) {
    console.log('inside userModels email ', JSON.stringify(email));
    // email = JSON.stringify(email);
    var stuff = database.select('*').from('users').where({'email': email});
    console.log(stuff);
    return stuff;
    // return database('users').where('email', JSON.stringify(email));
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