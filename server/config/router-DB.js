var express = require('express');
var router = express.Router();
var User = require('../models/userModel.js');
var DMMessage = require('../models/DMMessageModel.js');
var Message = require('../models/messageModel.js');
var Channel = require('../models/channelModel.js');
var ChannelUser = require('../models/ChannelUsersModel.js');
var DirectMessageRoom = require('../models/directMessageRoomModel.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

router.get('/getMe', function (request, response) {
  let encoded = request.headers.authorization.split(' ')[1];
  // console.log("what is encoded?",encoded)
  let token = jwt.decode(encoded, process.env.SECRET);
  let currentUserID = token.id;
  User.getUserByID(currentUserID)
  .then(user => {
    // console.log('this is me ', user[0]);
    response.json(user[0]);
  })
  // response.json({currentUserID: currentUserID});
});

router.post('/getOther', function(request, response) {
  console.log(request, 'this is the data you requested Julia')
  let id = request.body.id
  User.getUserByID(id)
  .then(user => {
    response.status(201).json(user);
  });
});

router.get('/users', function (request, response) {
  // let theUser = request.body.email
  User.getUsers()
  .then(users => {
    // console.log(users, 'this is the response of users line 27 router-DB')
    response.json(users);
  });
});

router.post('/login', function (request, response) {
  // console.log("A USER IS TRYING TO LOGIN", request.body)
  User.getUser(request.body.email)
  .then(user => {
    bcrypt.compare(request.body.password, user[0].password, function(err, matched) {
      if(matched) {
        let token = jwt.encode({id: user[0].id}, process.env.SECRET);
        response.json({id_token: token});
      } else {
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
    .then(user => {
      let token = jwt.encode({id: user[0]}, process.env.SECRET);
      console.log(token, "Hi 577777");
      response.json({id_token: token});
    })
    .catch(error => {
      response.send(error)
    })
});
});

//THIS IS WHERE I START
router.post('/usersInfo', function(request, response) {
  // console.log(request.body, 'this is the request from router post usersInfo');
  User.postOtherUserInformation({
      id: request.body.id,
      email: request.body.email,
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

router.post('/usersInfoInitial', function(request, response) {
  console.log(request.body, 'this is the request from router post usersInfo');
  User.postProfile({
      id: request.body.id,
      email: request.body.email || null,
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

//get my subscribed channels
router.post('/getMyChannels', function (request, response) {
  ChannelUser.getMyChannels(request.body.myUserID)
  .then(data => response.status(201).json(data));
});

//add a channel I subscribe to
router.post('/addMyChannel', function (request, response) {
  ChannelUser.addMyChannel(request.body.myUserID, request.body.channelID)
  .then(data => response.status(201).json(data));
});

//get all DM rooms
router.get('/DMRooms', function (request, response) {
  DirectMessageRoom.getRooms()
  .then(data => {
    // console.log("what is my data",data)
    response.json(data);
  });
})

//add a new DM room
router.post('/DMRooms', function (request, response) {
  DirectMessageRoom.addRoom(
    request.body.user1,
    request.body.user2, 
    request.body.channelName, 
    request.body.aliasName)
  .then(data => response.status(201).json(data));
});

router.post('/messages', function (request, response) {
  console.log("what is post message request?",request.body)
  let encoded = request.headers.authorization.split(' ')[1];
  let token = jwt.decode(encoded, process.env.SECRET);
  // console.log("what is the token?",token);
  let data = {
    userID: token.id,
    channelID: request.body.channelID,
    message: request.body.message,
    url: request.body.url,
  }
  Message.postMessage(data)
  .then(data => response.status(201).json(data));
});

router.post('/DMMessages', function (request, response) {
  // console.log("what is in my request body?",request.body)
  // console.log("what is auth?",request.headers.authorization)
  let encoded = request.headers.authorization.split(' ')[1];
  let token = jwt.decode(encoded, process.env.SECRET);
  // console.log("what is the token?",token);
  let data = {
    authorID: token.id,
    DM_roomID: request.body.DM_roomID,
    message: request.body.message
  }
  DMMessage.postMessage(data)
  .then(data => response.status(201).json(data));
});

router.get('/messages', function (request, response) {
  Message.getMessages()
  .then(data => response.json(data));
});

router.get('/DMMessages', function (request, response) {
  DMMessage.getMessages()
  .then(data => response.json(data));
});

module.exports = router;