var express = require('express');
var router = express.Router();

var passport = require('passport');
var Auth0Strategy = require('Auth0Strategy');

var strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
  return done(null, profile); 
});

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializerUser(function(user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());


router.post('/signup', function (req, res) {
  // try to signup a new user
});

router.post('/login', function (req, res, next) {
  // try to login user here
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
  // res.status(200).json({status: 'Bye!'});
});

module.exports = router;