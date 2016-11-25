/*
Note to user: 
This file is the set of actions for the download of direct message rooms into the store,
both from the database as well as from the socket. 

This file also has the incrementing action for unread messages for when the user is not in the room
*/

let nextMessageId = 1000;
//because in the Reducer, we are declaring an initial room called 'default' with ID=0


//from database
export const addDMRoom = (eachRoom) => {
  return {
    type: 'ADD_DM_ROOM',
    id: eachRoom.id,
    user1ID: eachRoom.user1ID,
    user2ID: eachRoom.user2ID,
    user1username: eachRoom.user1username,
    user2username: eachRoom.user2username,
    channelName: eachRoom.channelName,
    aliasName: eachRoom.aliasName,
    currentRoomToggle: eachRoom.currentRoomToggle,
    unreadMessageCounter: 0
  };
};

//for socket
export const addDMRoomFromSocket = (eachRoom) => {
  return {
    type: 'ADD_DM_ROOM_FROM_SOCKET',
    id: eachRoom.id,
    user1ID: eachRoom.user1ID,
    user2ID: eachRoom.user2ID,
    user1username: eachRoom.user1username,
    user2username: eachRoom.user2username,
    channelName: eachRoom.channelName,
    aliasName: eachRoom.aliasName,
    currentRoomToggle: eachRoom.currentRoomToggle,
    unreadMessageCounter: 0
  };
};

export const incrementDMUnreadMessageCounter = (channelName) => {
    console.log("room in inc in RoomActions",channelName)
  return {
    type: "INCREMENT_DM_UNREAD_MESSAGE_COUNTER",
    channelName: channelName
  };
};