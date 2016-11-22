var dotenv = require('dotenv').config({path: './config.env'});
var express = require('express');
var app = express();
var path = require('path');
var cloudinary = require('cloudinary').v2;
var User = require('./models/userModel.js');
var jwt = require('jwt-simple');

// require middleware
require('./config/middleware.js')(app, express);



// database router
var dbRouter = require('./config/router-DB.js');
app.use('/db', dbRouter)

var giphyRouter = require('./config/router-giphy.js');
app.use('/api', giphyRouter)

var eager_options = {
  width: 200, height: 200, crop: 'fit', format: 'jpg'
};

app.post('/pic', function(request, response) {
  let encoded = request.headers.authorization.split(' ')[1];
  let token = jwt.decode(encoded, process.env.SECRET);
  let currentUserID = token.id;

  cloudinary.uploader.upload(request.body.pic, {tags : "basic_sample", eager: eager_options}, function(err,image) {
    if (err){ console.error(err);}
    data = {
      id: currentUserID,
      picture: image.eager[0].url
    }
    User.postProfilePicture(data)
    .then(res => response.json({url: image.eager[0].url}));
  });
})

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  })
);

var params = {
  from: process.env.GMAIL_USER,
  to: 'katosych@gmail.com, canhcoding@gmail.com, juliafrandall@gmail.com',
  subject: 'Hi friends!',
  text: 'Check out slackerchat! https://slacker-chat.herokuapp.com/'
}

app.post('/email', function(request, response) {
  transport.sendMail(params, function (err, res) {
    if(err) console.error(err);
    response.sendStatus(200);
  });
});


// // require socket
// var http = require('http').Server(app);
// require('./socket/socket.js')(http);
var http = require('http').Server(app);
var socket = require('./socket/socket.js');
var io = require('socket.io')(http);
var organizationName = '/Hack-Reactor-NameSpace'; //hard-coded for now
var hrns = io.of(organizationName); 
//Just one "organization" for now, called HRNS. we can add more later
var currentRoom = '';
var currentUserUsername = '';
var loggedInUsers = {};
hrns.on('connection', 

//Putting the socket code here for now. Having trouble with modularity and passing
//the io socket from the other file to this one

function(socket){

  socket.on('setMyEmailInSocket', function(fromClient){
    // console.log('fromClient: ' + fromClient);
    currentUserUsername = fromClient.username;
    loggedInUsers[fromClient.username] = socket.id;
    hrns.in(currentRoom).emit('onlineToggle ON', fromClient.username);
    console.log("input socket ID: ", fromClient.username,"     ",loggedInUsers[fromClient.username]);
    console.log("whos logged in now line 110 server.js",loggedInUsers)
  });
  
  socket.on('getAllLoggedInUsersFromSocket', function() {
    hrns.in(currentRoom).emit('getAllLoggedInUsersFromSocket', loggedInUsers);
  });
  
  socket.on('changeRoom', function(room) {
    currentRoom = room;
    socket.join(room);
    console.log("currentRoom",currentRoom);
  });

  socket.on('someoneJoin', function(username){
    console.log(username + ' connected');
    var msg = username + ' connected';
    hrns.in(currentRoom).emit('someoneJoin', msg);
  });

  //user sends message into room
  socket.on('chat message', function(fromClient){
    // console.log('fromClient: ' + fromClient);
    console.log('user: ' + fromClient.username);
    console.log('chat message: ' + fromClient.msg);
    console.log('picture: ' + fromClient.picture);
    console.log("urL: " + fromClient.url);
    console.log("channelName: " + fromClient.channelName)
    console.log("channelID: " + fromClient.channelID)
    // console.log('room name: ' + fromClient.room, currentRoom);
    hrns.in(currentRoom).emit('chat message', {
      channelName: fromClient.channelName,
      channelID: fromClient.channelID,
      username: fromClient.username,
      text: fromClient.msg,
      url: fromClient.url,
      picture: fromClient.picture,
    });
  });

  socket.on('direct message', function(fromClient){
    console.log("what's from client - message",fromClient.msg);
    console.log("what's from client - room",fromClient.room);
    var inputSocketID = loggedInUsers[fromClient.recipientUsername]
    socket.broadcast.to(inputSocketID).emit("direct message",
      {
        msg: fromClient.msg,
        room: fromClient.room
      }
    );
  });

  //user disconnects from room
  socket.on('disconnect', function(){
    var keys = Object.keys(loggedInUsers);
    for (var i = 0; i < keys.length; i++){
      if(loggedInUsers[keys[i]] === socket.id){
        console.log(keys[i],' left the room');
        var msg = keys[i] + ' left the room';
        hrns.in(currentRoom).emit('disconnected', msg);
        delete loggedInUsers[keys[i]];
        console.log("who's logged in now?",loggedInUsers)
        hrns.in(currentRoom).emit('onlineToggle OFF', keys[i]);
      }
    }
  });
    
});

//End of socket code. Can bring that back to the socket file later










//set and run the port and server
app.set('port',process.env.PORT || 3000);
var port = app.get('port');
http.listen(port);
console.log("Server listening on PORT",port);

app.get('*', function(req, res){
 res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
});


//export app
module.exports = app;