var database = require('../db/db');

var DMMessage = {

  // this is the working one
  // getMessages: function() {
  //   return database.select('*').from('channel_messages');
  // },

  // this is the expanded
  getMessages: function() {
    return database('channel_messages')
           .join('users as u1','channel_messages.userID', 'u1.id')
           .join('channel as c1','channel_messages.channelID', 'c1.id')
           .select(
                 'channel_messages.id',
                 'u1.username as username',
                 'u1.id as userIDinDB',
                 'c1.name as channelName',
                 'c1.id as channelIDinDB',
                 'channel_messages.message',
                 'channel_messages.created_at');
  },
   
  postMessage: function(data) {
    console.log("what is the data in this post reuqest for DMMessages",data)
    return database('DM_messages')
    .insert({
      authorID: data.authorID,
      DM_roomID: data.DM_roomID,
      message: data.message,
      created_at: new Date().toJSON().toString(),
      updated_at: new Date().toJSON().toString()
    });
  } 
}

module.exports = DMMessage;