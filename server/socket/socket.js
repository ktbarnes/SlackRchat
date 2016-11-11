// For Socket.io

// module.exports = function(http){
//   var io = require('socket.io')(http);

//   io.sockets.on('connection', function(socket){

//     console.log('a user connected to:' + socket.id);
//     io.sockets.emit('someoneJoin','a user connected');

//     socket.on('chat message', function(msg){
//       console.log('message: ' + msg);
//       io.sockets.emit('chat message', msg);
//     });

//     socket.on('disconnect', function(msg){
//       console.log('user disconnected');
//       msg = 'A user disconnected';
//       io.sockets.emit('disconnected',msg);
//     });

//   });sub
    
// }

module.exports = function(socket){

  var currentRoom = '';

  console.log('a user connected to:' + socket.id);
  socket.broadcast.emit('someoneJoin','A user connected');

  socket.on('chat message', function(fromClient){
    console.log('chat message: ' + fromClient.msg);
    console.log('room name: ' + fromClient.room);
    // socket.emit('chat message', fromClient.msg);
    // socket.broadcast.emit('chat message', fromClient.msg);
    socket.to(fromClient.room).emit('chat message', fromClient.msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    var msg = 'A user disconnected';
    socket.broadcast.emit('disconnected',msg);
  });


  //Room-specific code

  socket.on('changeRoom', function(room) {
    currentRoom = room;
    socket.join(room);
    console.log("currentRoom",currentRoom);
    socket.in(currentRoom).broadcast.emit('roomMessage', 'what is going on, party people?');
    socket.to(currentRoom).emit('roomMessageTest', 'TEST - what is going on, party people?');
  });

  // io.sockets.in(currentRoom).emit('message', 'what is going on, party people?');
  socket.in(currentRoom).broadcast.emit('roomMessage', 'what is going on, party people?');
  socket.to(currentRoom).emit('roomMessageTest', 'TEST - what is going on, party people?');
    
}