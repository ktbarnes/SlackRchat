/*
Note to reader:
This is the corresponding reducer for the RoomActions set of actions. 

Note that as in the actions file, the last function "TOGGLE_CURRENT_ROOM" isn't ultimately
used but kept here in case it is going to be used in the future
*/

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
        if(eachRoom.id === action.roomID){
          return Object.assign({},eachRoom,{
            AmISubscribedToggle: false
          });
        }
        return eachRoom
      })

    case 'TOGGLE_SUBSCRIBED_ROOM_ON':
      return state.map( (eachRoom) => {
        console.log("Toggle On in RoomReducer",eachRoom)
        if(eachRoom.channelName === action.channelName){
          return Object.assign({},eachRoom,{
            AmISubscribedToggle: true
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