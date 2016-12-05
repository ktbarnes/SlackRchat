var database = require('../db/db');

var Channel = {
  getChannels: function() {
    return database.select('*').from('channel');
  },
   
  getChannel: function(name) {
    return database.select('*').from('channel').where('name', name);
  },

  addChannel: function(name) {
    return database('channel')
    .insert({
      name: name
    })
  } 
}

module.exports = Channel;
