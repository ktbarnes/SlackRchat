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

  console.log('a user connected to:' + socket.id);
  socket.broadcast.emit('someoneJoin','a user connected');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    socket.emit('chat message', msg);
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    var msg = 'A user disconnected';
    socket.broadcast.emit('disconnected',msg);
  });

    
}