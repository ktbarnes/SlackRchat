var express = require('express');
var router = express.Router();
var User = require('../models/userModels.js');
var bcrypt = require('bcrypt-nodejs');
var SALT_FACTOR = 10;
// var jwt = require('jwt-simple');

router.get('/users', function (request, response) {
  User.getUsers()
  .then(users => response.send(users));
});

router.post('/login', function (request, response) {
  console.log('REQUEST.BODY',request.body);
  // User.getUsers()
  // .then(users => {
  //   console.log(users);
  //   for(let i = 0; i < users.length; i++) {
  //     if(users[i].email === request.body.email) {
  //       console.log(users[i]);
  //       bcrypt.compare(request.body.password, users[i].password, function(err, matched) {
  //         console.log(matched);
  //         if(matched) {
  //           response.sendStatus(200);
  //         }
  //         else {
  //           response.sendStatus(400);
  //         }
  //       });
  //       break;
  //     }
  //   }
  // });
  User.getUser(request.body.email)
  .then(user => {
    console.log('user',user.password);
    console.log('request.body.password',request.body.password);
    bcrypt.compare(request.body.password, user.password, function(err, matched) {
      console.log(matched);
      if(matched) {
        response.sendStatus(200);
      }
      else {
        response.sendStatus(400);
      }
    });
  });
});

router.post('/users', function (request, response) {
  console.log("REQUEST.BODY: ",request.body);

  bcrypt.hash(request.body.password, null, null, function(err, hash) {
    console.log(hash);
    User.postUser({
      username: request.body.username,
      email: request.body.email,
      password: hash
    })
    .then(data => response.sendStatus(201));

  });

});


module.exports = router;