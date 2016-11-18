var bodyParser = require('body-parser');

module.exports = function (app, express) {
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
  app.use(bodyParser.json({limit: "50mb"}));
  app.use(express.static(__dirname + '/../../client/'));
};
