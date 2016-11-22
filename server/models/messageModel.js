var database = require('../db/db');

var Message = {

  getMessages: function() {
    return database('channel_messages')
     .join('users as u1','channel_messages.userID', 'u1.id')
     .join('channel as c1','channel_messages.channelID', 'c1.id')
     .select(
           'channel_messages.id',
           'u1.username as username',
           'u1.picture as picture',
           'u1.id as userIDinDB',
           'c1.name as channelName',
           'c1.id as channelIDinDB',
           'channel_messages.message',
           'channel_messages.url',
           'channel_messages.created_at');
  },
   
  postMessage: function(data) {
    return database('channel_messages')
    .insert({
      userID: data.userID,
      channelID: data.channelID,
      message: data.message,
      url: data.url,
      created_at: new Date().toJSON().toString(),
      updated_at: new Date().toJSON().toString()
    });
  }, 

  getLastWeek: function(date) {
    return database('channel_messages')
      .join('users as u1','channel_messages.userID','u1.id')
      .join('channel as c1','channel_messages.channelID','c1.id')
      .select('channel_messages.id',
              'u1.username as username',
              'c1.name as channelName',
              'channel_messages.url as giphy',
              'channel_messages.created_at as created_at')
      .where('channel_messages.created_at','>',date);
  },

}

module.exports = Message;