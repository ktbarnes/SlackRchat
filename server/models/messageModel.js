var database = require('../db/db');

var Message = {

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
                 'u1.username',
                 'c1.name',
                 'channel_messages.message',
                 'channel_messages.created_at');
  },
   
  postMessage: function(data) {
    return database('channel_messages')
    .insert({
      userID: data.userID,
      channelID: data.channelID,
      message: data.message,
      created_at: new Date().toJSON().toString(),
      updated_at: new Date().toJSON().toString()
    });
  } 
}

module.exports = Message;