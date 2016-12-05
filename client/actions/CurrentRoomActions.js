/*
Note to reader: This is a reducer we set up to capture the "current" room the user in the 
application is in at any given time. 
The user1username/user2username logic accommodates for the fact that the current room can
be either a public channel or a private direct message

The corresponding reducer to this action is the CurrentRoomReducer.js file
*/

export const setCurrentRoom = (room) => {
  return {
    type: 'SET_CURRENT_ROOM',
    id: room.id,
    channelName: room.channelName,
    aliasName: room.aliasName || "Channel_NotDM",
    user1username: room.user1username || "Channel_NotDM",
    user2username: room.user2username || "Channel_NotDM",
    currentRoomToggle: true
  };
};