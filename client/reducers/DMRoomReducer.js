/*
Note to user: 
This the corresponding reducer for the DMRoomActions. 
*/

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
          currentRoomToggle: action.currentRoomToggle,
          unreadMessageCounter: action.unreadMessageCounter
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

    case 'INCREMENT_DM_UNREAD_MESSAGE_COUNTER':
      return state.map( (eachRoom) => {
        console.log("room comparison",eachRoom.channelName," ",action.channelName)
        if(eachRoom.channelName === action.channelName){
          console.log("incremented in room reducer!!!")
          return Object.assign({},eachRoom,{
            unreadMessageCounter: eachRoom.unreadMessageCounter+1
          });
        }
        return eachRoom
      })
    
    default:
      return state;
  }
};

export default DMRoomReducer;