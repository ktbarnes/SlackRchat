var database = require('../db/db');

var DirectMessageRoom = {
  getRooms: function() {
    return database.select('*').from('DM_room');
  },
   

  addRoom: function(name1,name2) {
    return database('DM_room')
    .insert({
      user1: name1,
      user2: name2
    })
  } 
}

module.exports = DirectMessageRoom;