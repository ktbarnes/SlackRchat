var database = require('../db/db');



var ChannelUser = {

  //download of channels for any given user, specified by user ID. 
  getMyChannels: function(myUserID) {
    return database('channel_users')
           .join('channel','channel_users.channelID','channel.id')
           .where('userID',myUserID)
           .select(
                   'channel_users.id',
                   'channel.id as channelIDinchannelDB',
                   'channel.name as channelName');
  },

  addMyChannel: function(myUserID,channelID) {
    return database('channel_users')
    .insert({
      userID: myUserID,
      channelID: channelID
    })
  },

  deleteMyChannel: function(myUserID,channelID) {
    return database('channel_users')
    .where({
      userID: myUserID,
      channelID: channelID
    })
    .del()
  } 
  
}

module.exports = ChannelUser;