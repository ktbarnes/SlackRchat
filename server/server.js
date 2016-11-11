var dotenv = require('dotenv').config({path: './config.env'});
var express = require('express');
var app = express();
var path = require('path');



// require middleware
require('./config/middleware.js')(app, express);



// // require socket
// var http = require('http').Server(app);
// require('./socket/socket.js')(http);
var http = require('http').Server(app);
var socket = require('./socket/socket.js');
var io = require('socket.io')(http);
var hrns = io.of('/Hack-Reactor-NameSpace'); 
//Just one "organization" for now, called HRNS. we can add more later
hrns.on('connection', hrns => socket(hrns)); //I did this to pass into socket the io module



// database router
var dbRouter = require('./config/router-DB.js');
app.use('/db', dbRouter)



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