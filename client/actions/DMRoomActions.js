let nextMessageId = 1000;
//because in the Reducer, we are declaring an initial room called 'default' with ID=0


//from database
export const addDMRoom = (eachRoom) => {
  // console.log("each room passed into action in DMRoomActions",eachRoom)
  return {
    type: 'ADD_DM_ROOM',
    // id: (nextMessageId++).toString(),
    id: eachRoom.id,
    user1ID: eachRoom.user1ID,
    user2ID: eachRoom.user2ID,
    user1username: eachRoom.user1username,
    user2username: eachRoom.user2username,
    channelName: eachRoom.channelName,
    aliasName: eachRoom.aliasName,
    currentRoomToggle: eachRoom.currentRoomToggle
  };
};

//for socket
export const addDMRoomFromSocket = (eachRoom) => {
  // console.log("each room passed into action in DMRoomActions",eachRoom)
  return {
    type: 'ADD_DM_ROOM_FROM_SOCKET',
    // id: (nextMessageId++).toString(),
    id: eachRoom.id,
    user1ID: eachRoom.user1ID,
    user2ID: eachRoom.user2ID,
    user1username: eachRoom.user1username,
    user2username: eachRoom.user2username,
    channelName: eachRoom.channelName,
    aliasName: eachRoom.aliasName,
    currentRoomToggle: eachRoom.currentRoomToggle
  };
};