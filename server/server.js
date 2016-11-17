var dotenv = require('dotenv').config({path: './config.env'});
var express = require('express');
var app = express();
var path = require('path');



// require middleware
require('./config/middleware.js')(app, express);



// database router
var dbRouter = require('./config/router-DB.js');
app.use('/db', dbRouter)

var giphyRouter = require('./config/router-giphy.js');
app.use('/api', giphyRouter)



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
var currentUserEmail = '';
var currentUserUsername = '';
var loggedInUsers = {};
hrns.on('connection', 

//Putting the socket code here for now. Having trouble with modularity and passing
//the io socket from the other file to this one

function(socket){

  //testing this out for now only
  socket.on('setMyEmailInSocket', function(fromClient){
    console.log('fromClient: ' + fromClient);
    currentUserEmail = fromClient.email;
    currentUserUsername = fromClient.username;
    loggedInUsers[fromClient.email] = socket.id;
    // loggedInUsers[fromClient.email] = socket.id.substring(organizationName.length);
    console.log("did my user set?",loggedInUsers);
  });
  //hi
  //Room-specific code

  socket.on('changeRoom', function(room) {
    currentRoom = room;
    socket.join(room);
    console.log("currentRoom",currentRoom);
    // hrns.in(currentRoom).emit('chat message', {text: "A user has connected to the room"}); //commenting out for now because it got distracting
  });

  socket.on('someoneJoin', function(username){
    console.log(username + ' connected');
    var msg = username + ' connected';
    // socket.broadcast.emit('someoneJoin',msg);
    hrns.in(currentRoom).emit('someoneJoin', msg);
  });

  //user sends message into room
  socket.on('chat message', function(fromClient){
    // console.log('fromClient: ' + fromClient);
    // console.log('user: ' + fromClient.username);
    // console.log('chat message: ' + fromClient.msg);
    // console.log('room name: ' + fromClient.room, currentRoom);
    hrns.in(currentRoom).emit('chat message', {
      channelName: fromClient.channelName,
      channelID: fromClient.channelID,
      username: fromClient.username,
      text: fromClient.msg
    });
  });

  socket.on('direct message', function(fromClient){
    // console.log("what's from client - message",fromClient.msg);
    // console.log("what's from client - recipientEmail",fromClient.recipientEmail);
    // console.log("translating socket number",loggedInUsers[fromClient.recipientEmail]);
    // console.log("currentRoom",currentRoom);
    // console.log("io.sockets.connected",io.sockets.connected)
    var inputSocketID = loggedInUsers[fromClient.recipientEmail]
    // console.log("inputSocketID",inputSocketID)
    // console.log("loggedInUsers object",loggedInUsers);
    socket.broadcast.to(inputSocketID).emit("direct message",fromClient.msg);
    //other things I tried that didn't work
    // io.of(organizationName).to(inputSocketID).emit("direct message",fromClient.msg)
    // hrns.to(inputSocketID).emit("direct message",fromClient.msg)
    // io.to(inputSocketID).emit("direct message",fromClient.msg);
  });

  //user disconnects from room
  socket.on('disconnect', function(){
    console.log(currentUserUsername,' left the room');
    var msg = currentUserUsername + ' left the room';
    // socket.broadcast.emit('disconnected',msg);
    hrns.in(currentRoom).emit('disconnected', msg);
    delete loggedInUsers[currentUserUsername];
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