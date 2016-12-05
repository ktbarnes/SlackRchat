var database = require('../db/db');

var DMMessage = {

  //get all direct messages
  getMessages: function() {
    return database('DM_messages')
           .join('users as u1','DM_messages.authorID', 'u1.id')
           .join('DM_room as c1','DM_messages.DM_roomID', 'c1.id')
           .select(
                 'DM_messages.id',
                 'u1.username as author',
                 'u1.id as userIDinDB',
                 'u1.picture as picture',
                 'c1.channelName as channelName',
                 'c1.aliasName as aliasName',
                 'c1.id as roomIDinDB',
                 'DM_messages.message',
                 'DM_messages.url',
                 'DM_messages.created_at');
  },
 
   //post a direct messages  
  postMessage: function(data) {
    return database('DM_messages')
    .insert({
      authorID: data.authorID,
      DM_roomID: data.DM_roomID,
      message: data.message,
      url: data.url,
      created_at: new Date(),
      updated_at: new Date()
    });
  } 
}

module.exports = DMMessage;