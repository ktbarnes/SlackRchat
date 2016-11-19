var database = require('../db/db');

var DMMessage = {

  // this is the working one
  // getMessages: function() {
  //   return database.select('*').from('channel_messages');
  // },

  // this is the expanded
  getMessages: function() {
    return database('DM_messages')
           .join('users as u1','DM_messages.authorID', 'u1.id')
           .join('DM_room as c1','DM_messages.DM_roomID', 'c1.id')
           .select(
                 'DM_messages.id',
                 'u1.username as author',
                 'u1.id as userIDinDB',
                 'c1.channelName as channelName',
                 'c1.aliasName as aliasName',
                 'c1.id as roomIDinDB',
                 'DM_messages.message',
                 'DM_messages.created_at');
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