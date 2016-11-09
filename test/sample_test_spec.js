var assert = require('chai').assert;
var request = require('request');

//Dummy test
describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });
});



//Backend database GET requests
describe("Backend database functionality", function() {

  describe("Can perform a GET request to the database", function() {

    var url = "http://localhost:3000/db/users";

    it("returns a 200 status request upon success", function(done) {
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

  }); //End of "Can perform a GET request to the database"

}); //End of "Backend database functionality"