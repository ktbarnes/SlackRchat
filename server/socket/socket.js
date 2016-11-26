  // For Socket.io

module.exports = function(http){

  var io = require('socket.io')(http);
  var organizationName = '/Hack-Reactor-NameSpace'; //hard-coded for now
  var hrns = io.of(organizationName); 
  //Just one "organization" for now, called HRNS. we can add more later
  var currentRoom = '';
  var currentUserUsername = '';
  var loggedInUsers = {};

  hrns.on('connection', function(socket){

    socket.on('setMyEmailInSocket', function(fromClient){
      // console.log('fromClient: ' + fromClient);
      currentUserUsername = fromClient.username;
      loggedInUsers[fromClient.username] = socket.id;
      hrns.in(currentRoom).emit('onlineToggle ON', fromClient.username);
      // console.log("input socket ID: ", fromClient.username,"     ",loggedInUsers[fromClient.username]);
      // console.log("whos logged in now line 110 server.js",loggedInUsers)
    });
    
    socket.on('getAllLoggedInUsersFromSocket', function() {
      hrns.in(currentRoom).emit('getAllLoggedInUsersFromSocket', loggedInUsers);
    });
    
    socket.on('changeRoom', function(room) {
      currentRoom = room;
      socket.join(room);
      // console.log("currentRoom",currentRoom);
    });

    socket.on('someoneJoin', function(username){
      console.log(username + ' connected');
      var msg = username + ' connected';
      hrns.in(currentRoom).emit('someoneJoin', msg);
    });

    //user sends message into room
    socket.on('chat message', function(fromClient){
      // console.log('fromClient: ' + fromClient);
      // console.log('user: ' + fromClient.username);
      // console.log('chat message: ' + fromClient.msg);
      // console.log('picture: ' + fromClient.picture);
      // console.log("urL: " + fromClient.url);
      // console.log("channelName: " + fromClient.channelName)
      // console.log("channelID: " + fromClient.channelID)
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
      // console.log("what's from client - message",fromClient.msg);
      // console.log("what's from client - room",fromClient.room);
      var inputSocketID = loggedInUsers[fromClient.recipientUsername]
      socket.broadcast.to(inputSocketID).emit("direct message",
        {
          msg: fromClient.msg,
          url: fromClient.url,
          room: fromClient.room
        }
      );
    });

    //user disconnects from room
    socket.on('disconnect', function(){
      var keys = Object.keys(loggedInUsers);
      for (var i = 0; i < keys.length; i++){
        if(loggedInUsers[keys[i]] === socket.id){
          // console.log(keys[i],' left the room');
          var msg = keys[i] + ' left the room';
          hrns.in(currentRoom).emit('disconnected', msg);
          delete loggedInUsers[keys[i]];
          console.log("who's logged in now?",loggedInUsers)
          hrns.in(currentRoom).emit('onlineToggle OFF', keys[i]);
        }
      }
    });
      
  });
}