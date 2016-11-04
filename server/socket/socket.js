// For Socket.io

module.exports = function(http){
  var io = require('socket.io')(http);
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
      console.log('user disconnected');
      io.emit('a user has left the room');
    });
  });  
}
