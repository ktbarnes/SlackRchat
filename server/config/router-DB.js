var express = require('express');
var router = express.Router();
var User = require('../models/userModels.js');


router.get('/users', function (request, response) {
  User.getUsers()
  .then( (users) => response.send(users) );
});


router.post('/users', function (request, response) {
  console.log("REQUEST.BODY: ",request.body);
  User.postUser({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password
  })
  .then( (data) => 
    response.sendStatus(201) );
});


module.exports = router;