var database = require('../db/db');

var Message = {

  getMessages: function() {
    return database.select('*').from('channel_messages');
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