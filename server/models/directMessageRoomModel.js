var database = require('../db/db');

var DirectMessageRoom = {
  // getRooms: function() {
  //   return database.select('*').from('DM_room');
  // },

  getRooms: function() {
    return database('DM_room')
           .join('users as u1','DM_room.user1', 'u1.id')
           .join('users as u2','DM_room.user2', 'u2.id')
           .select(
                 'DM_room.id',
                 'u1.id as user1ID',
                 'u1.username as user1',
                 'u2.id as user2ID',
                 'u2.username as user2',
                 'DM_room.channelName',
                 'DM_room.aliasName');
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