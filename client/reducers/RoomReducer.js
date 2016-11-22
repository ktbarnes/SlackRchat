const RoomReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_ROOM':
      return [
        ...state,
        {
          id: action.id,
          channelName: action.channelName,
          aliasName: action.aliasName,
          currentRoomToggle: action.currentRoomToggle,
          AmISubscribedToggle: action.AmISubscribedToggle,
          unreadMessageCounter: action.unreadMessageCounter
        },
      ];

    case 'TOGGLE_SUBSCRIBED_ROOM_OFF':
      return state.map( (eachRoom) => {
        // console.log("email comparison",eachUser.email," ",action.userEmail)
        if(eachRoom.id === action.roomID){
          return Object.assign({},eachRoom,{
            AmISubscribedToggle: false
          });
        }
        return eachRoom
      })

    case 'INCREMENT_UNREAD_MESSAGE_COUNTER':
      return state.map( (eachRoom) => {
        console.log("room comparison",eachRoom.channelName," ",action.channelName)
        if(eachRoom.channelName === action.channelName){
          return Object.assign({},eachRoom,{
            unreadMessageCounter: eachRoom.unreadMessageCounter+1
          });
        }
        return eachRoom
      })

    case 'TOGGLE_CURRENT_ROOM':
      return [
        ...state,
        {
          id: action.id,
          channelName: action.channelName,
          currentRoomToggle: action.currentRoomToggle
        },
      ];

    
    default:
      return state;
  }
};

export default RoomReducer;