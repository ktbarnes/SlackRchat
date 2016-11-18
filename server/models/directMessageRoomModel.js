var database = require('../db/db');

var DirectMessageRoom = {
  getRooms: function() {
    return database.select('*').from('DM_room');
  },
   

  addRoom: function(user1,user2,channelName,aliasName) {
    return database('DM_room')
    .insert({
      user1: user1,
      user2: user2,
      channelName: channelName,
      aliasName: aliasName
    })
  } 
}

module.exports = DirectMessageRoom;