var express = require('express');
var router = express.Router();
var User = require('../models/userModel.js');
var Message = require('../models/messageModel.js');
var Channel = require('../models/channelModel.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

router.get('/getMe', function (request, response) {
  let encoded = request.headers.authorization.split(' ')[1];
  // console.log("what is encoded?",encoded)
  let token = jwt.decode(encoded, process.env.SECRET);
  let currentUserID = token.id;
  response.json({currentUserID: currentUserID});
});

router.get('/users', function (request, response) {
  User.getUsers()
  .then(users => response.json(users));
});

router.post('/login', function (request, response) {
  console.log("A USER IS TRYING TO LOGIN", request.body)
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
  // console.log("REQUEST.BODY: ",request.body);

  bcrypt.hash(request.body.password, null, null, function(err, hash) {
    User.postUser({
      username: request.body.username,
      email: request.body.email,
      password: hash,
      
    })
    .then(data => response.sendStatus(201));
  });
});

//THIS IS WHERE I START
router.post('/usersInfo', function(request, response) {
  console.log(request.body, 'this is the request from router post usersInfo');
  User.postOtherUserInformation({
      email:request.body.email || null,
      first: request.body.first || null,
      last: request.body.last || null,
      phone: request.body.phone || null,
      about: request.body.about || null,
      github: request.body.github || null,
      facebook: request.body.facebook || null,
      twitter: request.body.twitter || null,
      linkedin: request.body.linkedin || null
  }).then(data => response.sendStatus(201));
})

router.post('/channels', function (request, response) {
  Channel.addChannel(request.body.name)
  .then(data => response.status(201).json(data));
});

router.get('/channels', function (request, response) {
  Channel.getChannels()
  .then(data => response.json(data));
})

router.post('/messages', function (request, response) {
  // console.log("what is auth?",request.headers.authorization)
  let encoded = request.headers.authorization.split(' ')[1];
  let token = jwt.decode(encoded, process.env.SECRET);
  // console.log("what is the token?",token);
  let data = {
    userID: token.id,
    channelID: request.body.channelID,
    message: request.body.message
  }
  Message.postMessage(data)
  .then(data => response.status(201).json(data));
});

router.get('/messages', function (request, response) {
  Message.getMessages()
  .then(data => response.json(data));
});

module.exports = router;