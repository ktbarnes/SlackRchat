const DMRoomReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_DM_ROOM':
      return [
        ...state,
        {
          id: action.id,
          user1ID: action.user1ID,
          user2ID: action.user2ID,
          user1username: action.user1username,
          user2username: action.user2username,
          channelName: action.channelName,
          aliasName: action.aliasName,
          currentRoomToggle: action.currentRoomToggle
        }
      ];

    case 'ADD_DM_ROOM_FROM_SOCKET':
      return [
        ...state,
        {
          id: action.id,
          user1ID: action.user1ID,
          user2ID: action.user2ID,
          user1username: action.user1username,
          user2username: action.user2username,
          channelName: action.channelName,
          aliasName: action.aliasName,
          currentRoomToggle: action.currentRoomToggle
        }
      ];

    
    default:
      return state;
  }
};

export default DMRoomReducer;