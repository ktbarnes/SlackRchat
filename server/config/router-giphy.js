var express = require('express');
var router = express.Router();
var req = require('request');

router.post('/giphy', function(request, response) {
  console.log(request.body.giphy);
  let search = request.body.giphy.split(' ').join('+');
  console.log('http://api.giphy.com/v1/gifs/search?q=' + search + '&rating=pg&api_key=dc6zaTOxFJmzC');
  req.get({
    url: 'http://api.giphy.com/v1/gifs/search?q=' + search + '&rating=pg&fmt=json&api_key=dc6zaTOxFJmzC'
  }, function(error, res) {
    let data = JSON.parse(res.body);
    let index = Math.floor(Math.random()*data.data.length);
    console.log(data.data[index]);
    response.status(200).send(data.data[index]);
  });
});

module.exports = router;