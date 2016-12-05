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


//receive token from user's localstorage and return info for user matched by ID
router.get('/getMe', function(request, response) {
  let encoded = request.headers.authorization.split(' ')[1];
  let token = jwt.decode(encoded, process.env.SECRET);
  let currentUserID = token.id;
  User.getUserByID(currentUserID)
  .then(user => {
    response.json(user[0]);
  })
});


//return info from DB for other user, searched by ID
router.post('/getOther', function(request, response) {
  let id = request.body.id
  User.getUserByID(id)
  .then(user => {
    response.status(201).json(user);
  });
});


//download all users from the database
router.get('/users', function(request, response) {
  User.getUsers()
  .then(users => {
    response.json(users);
  });
});


//this is where user's login is authenticated
router.post('/login', function(request, response) {
  User.getUser(request.body.email)
  .then(user => {
    bcrypt.compare(request.body.password, user[0].password, function(err, matched) {
      if(matched) {
        let token = jwt.encode({id: user[0].id, admin: user[0].admin}, process.env.SECRET);
        response.json({id_token: token});
      } else {
        response.sendStatus(401);
      }
    });
  });
});


//
router.post('/users', function(request, response) {
  bcrypt.hash(request.body.password, null, null, function(err, hash) {
    User.postUser({
      username: request.body.username,
      email: request.body.email,
      password: hash,
      picture: 'http://res.cloudinary.com/due97dtb0/image/upload/c_thumb,h_200,w_200/v1479743340/Default_vnuhvy.jpg',
    })
    .then(user => {
      let token = jwt.encode({id: user[0]}, process.env.SECRET);
      response.json({
        id_token: token,
        idInDatabase: user[0]
      });
    })
    .catch(error => {
      response.send(error)
    })
});
});


//THIS IS WHERE I START
router.post('/usersInfo', function(request, response) {
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


//
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


//download all public channels
router.get('/channels', function(request, response) {
  Channel.getChannels()
  .then(data => response.json(data));
})


//add a channel to the database and return its info
router.post('/channels', function(request, response) {
  Channel.addChannel(request.body.name)
  .then(data => response.status(201).json(data));
});


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

//delete a channel I had subscribed to
router.post('/deleteMyChannel', function (request, response) {
  console.log("deleteMyChannel router-DB request.body",request.body)
  ChannelUser.deleteMyChannel(request.body.myUserID, request.body.channelID)
  .then(data => response.status(201).json(data));
});

//get all DM rooms
router.get('/DMRooms', function (request, response) {
  DirectMessageRoom.getRooms()
  .then(data => {
    response.json(data);
  });
})

//add a new DM room
router.post('/DMRooms', function(request, response) {
  DirectMessageRoom.addRoom(
    request.body.user1,
    request.body.user2, 
    request.body.channelName, 
    request.body.aliasName)
  .then(data => response.status(201).json(data));
});

router.post('/profpic', function(request, response) {

})

router.post('/messages', function(request, response) {
  console.log("what is post message request?",request.body)
  let encoded = request.headers.authorization.split(' ')[1];
  let token = jwt.decode(encoded, process.env.SECRET);
  let data = {
    userID: token.id,
    channelID: request.body.channelID,
    message: request.body.message,
    url: request.body.url,
  }
  Message.postMessage(data)
  .then(data => response.status(201).json(data));
});


//download all messages posted to the public channels
router.get('/messages', function(request, response) {
  Message.getMessages()
  .then(data => response.json(data));
});


//download all direct messages
router.get('/DMMessages', function(request, response) {
  DMMessage.getMessages()
  .then(data => response.json(data));
});


//add a new direct message
router.post('/DMMessages', function(request, response) {
  let encoded = request.headers.authorization.split(' ')[1];
  let token = jwt.decode(encoded, process.env.SECRET);
  let data = {
    authorID: token.id,
    DM_roomID: request.body.DM_roomID,
    message: request.body.message,
    url: request.body.url,
  }
  DMMessage.postMessage(data)
  .then(data => response.status(201).json(data));
});


router.get('/lastWeek', function(request, response) {
  let encoded = request.headers.authorization.split(' ')[1];
  let token = jwt.decode(encoded, process.env.SECRET);
  if(token.admin !== 1) response.sendStatus(403);
  else {
    let current = new Date();
    let weekAgo = new Date(current-604800000).toJSON().toString();
    Message.getLastWeek(weekAgo)
    .then(data => {
      response.json(data);
    })
  }
});

module.exports = router;