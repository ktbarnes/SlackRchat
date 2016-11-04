var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var pg = require('pg'); //for database
var database = require('./db/db.js');

// require middleware
require('./config/middleware.js')(app, express);



//for database

databaseURL = process.env.CLEARDB_DATABASE_URL || 'mysql://bbd5c14988d54b:3a05fe22@us-cdbr-iron-east-04.cleardb.net/heroku_6cc672b0ab505f1?reconnect=true';

app.get('/db', function (request, response) {
  database.select('*').from('users')
  .then( (users) => response.send(users) );
});

app.post('/db', function (request, response) {
  console.log("REQUEST.BODY: ",request.body);
  database('users').insert({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password
  })
  .then( (data) => 
    response.sendStatus(201) );
});


// For Socket.io

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

// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '../client/dist/index.html')
// })

//set and run the port and server
app.set('port',process.env.PORT || 3000);
var port = app.get('port');
http.listen(port);
console.log("Server listening on PORT",port);




//export app
module.exports = app;