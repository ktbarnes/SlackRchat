var dotenv = require('dotenv').config({path: './config.env'});

var express = require('express');
var app = express();



// require middleware
require('./config/middleware.js')(app, express);



// require socket
var http = require('http').Server(app);
require('./socket/socket.js')(http);



// database router
var dbRouter = require('./config/router-DB.js');
app.use('/db', dbRouter)



//set and run the port and server
app.set('port',process.env.PORT || 3000);
var port = app.get('port');
http.listen(port);
console.log("Server listening on PORT",port);



//export app
module.exports = app;