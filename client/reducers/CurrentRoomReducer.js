const CurrentRoomReducer = (state = {channelName: "Lobby"}, action) => {
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