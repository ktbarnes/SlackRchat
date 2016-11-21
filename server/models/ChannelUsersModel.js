var database = require('../db/db');

var ChannelUser = {
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
  } 
}

module.exports = ChannelUser;