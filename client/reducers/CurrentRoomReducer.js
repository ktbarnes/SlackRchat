const CurrentRoomReducer = (state = {channelName: "Lobby"}, action) => {
  switch (action.type) {

    case 'SET_CURRENT_ROOM':
      return {
          id: action.id,
          channelName: action.channelName,
          aliasName: action.aliasName,
          currentRoomToggle: action.currentRoomToggle
        };
    
    default:
      return state;
  }
};

export default CurrentRoomReducer;