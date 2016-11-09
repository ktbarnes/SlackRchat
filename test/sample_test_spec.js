//can start to write tests here. general approach would be to create a 
//new file for each series of set of tests you want to write

var assert = require('chai').assert;
var request = require('request');

//Backend database
describe("Backend database functionality", function() {

 describe("Can perform a GET request to the database", function() {

   var url = "http://localhost:3000/db/users";

  it("returns the database of users", function(done) {
    request(url, function(error, response, body) {
      assert.equal(response.statusCode,200);
      done();
    });
  });

  it("data that is returned should be an Array", function(done) {
    request(url, function(error, response, body) {
      assert.isArray(JSON.parse(response.body));
      done();
    });
  });

 });

});