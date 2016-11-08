var express = require('express');
var router = express.Router();
var User = require('../models/userModels.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

router.get('/users', function (request, response) {
  User.getUsers()
  .then(users => response.send(users));
});

router.post('/login', function (request, response) {
  User.getUser(request.body.email)
  .then(user => {
    bcrypt.compare(request.body.password, user[0].password, function(err, matched) {
      if(matched) {
        let token = jwt.encode({id: user[0].id}, process.env.SECRET);
        response.json({id_token: token});
      }
      else {
        response.sendStatus(401);
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