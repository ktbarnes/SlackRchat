// For Socket.io

module.exports = function(http){
  var io = require('socket.io')(http);

  io.on('connection', function(socket){

    console.log('a user connected to:' + socket.id);

    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });

    socket.on('disconnect', function(msg){
      console.log('user disconnected');
      msg = 'A user disconnected';
      io.emit('disconnected',msg);
    });

  });

    
}
