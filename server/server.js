var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// require middleware
require('./config/middleware.js')(app, express);


// For Socket.io, hacky approach
require('../node_modules/socket.io-client/socket.io.js');




io.on('connection', function(socket){
  console.log('a user connected');
});


//set and run the port and server
app.set('port',process.env.PORT || 8000);
var port = app.get('port');
http.listen(port);
console.log("Server listening on PORT",port);




//export app
module.exports = app;