var database = require('../db/db');

var Room = {
  getRooms: function(){
    return database.select('*').from('channel');
  },
   
  getRoom: function(name){
    return database.select('*').from('channel').where('name', name);
  },

  addRoom: function(){
    return database('channel')
    .insert({
//need to find way to reference users that belong to the table, inner join?      
//models for join tables?
    })
  } 
  }
}