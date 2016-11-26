var dotenv = require('dotenv').config({path: './config.env'});
var express = require('express');
var app = express();
var path = require('path');
var cloudinary = require('cloudinary').v2;
var User = require('./models/userModel.js');
var jwt = require('jwt-simple');

// require middleware
require('./config/middleware.js')(app, express);

// database router
var dbRouter = require('./config/router-DB.js');
app.use('/db', dbRouter)


// require socket instance
var http = require('http').Server(app);
var socket = require('./socket/socket.js')(http);


var giphyRouter = require('./config/router-giphy.js');
app.use('/api', giphyRouter)

var eager_options = {
  width: 200, height: 200, crop: 'fit',
};

app.post('/pic', function(request, response) {
  let encoded = request.headers.authorization.split(' ')[1];
  let token = jwt.decode(encoded, process.env.SECRET);
  let currentUserID = token.id;

  cloudinary.uploader.upload(request.body.pic, {tags : "basic_sample", eager: eager_options}, function(err,image) {
    if (err){ console.error(err);}
    data = {
      id: currentUserID,
      picture: image.eager[0].url
    }
    User.postProfilePicture(data)
    .then(res => response.json({url: image.eager[0].url}));
  });
})

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  })
);

var params = {
  from: process.env.GMAIL_USER,
  to: 'katosych@gmail.com, canhcoding@gmail.com, juliafrandall@gmail.com',
  subject: 'Hi friends!',
  text: 'Check out slackerchat! https://slacker-chat.herokuapp.com/'
}

app.post('/email', function(request, response) {
  transport.sendMail(params, function (err, res) {
    if(err) console.error(err);
    response.sendStatus(200);
  });
});


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