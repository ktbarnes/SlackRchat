/*
Note to reader:
This file is the corresponding reducer to the CurrentRoomActions file. 
Note that the state of the reducer is initially set to Lobby. 
*/

const CurrentRoomReducer = (state = {
  id: 1,
  channelName: "Lobby",
  aliasName: "Channel_NotDM",
  user1username: "Channel_NotDM",
  user2username: "Channel_NotDM",
  currentRoomToggle: true
}, action) => {
  switch (action.type) {

    case 'SET_CURRENT_ROOM':
      return {
          id: action.id,
          channelName: action.channelName,
          aliasName: action.aliasName,
          user1username: action.user1username,
          user2username: action.user2username,
          currentRoomToggle: action.currentRoomToggle
        };
    
    default:
      return state;
  }
};

export default CurrentRoomReducer;