var express = require('express');

var app = express();

// require middleware
require('./config/middleware.js')(app, express);

//set and run the port and server
app.set('port',process.env.PORT || 8000);
var port = app.get('port');
app.listen(port);
console.log("Server listening on PORT",port);

//export app
module.exports = app;