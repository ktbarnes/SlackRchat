let nextMessageId = 1000;
//because in the Reducer, we are declaring an initial room called 'default' with ID=0

export const addRoom = (eachRoom) => {
  return {
    type: 'ADD_ROOM',
    // id: (nextMessageId++).toString(),
    id: eachRoom.id,
    channelName: eachRoom.channelName,
    aliasName: "Channel_NotDM",
    currentRoomToggle: eachRoom.currentRoomToggle,
    AmISubscribedToggle: eachRoom.AmISubscribedToggle,
    unreadMessageCounter: 0
  };
};

export const toggleSubscribeRoomOff = (room) => {
    // console.log("user in toggleOnlineUser in UserActions",userEmail)
  return {
    type: "TOGGLE_SUBSCRIBED_ROOM_OFF",
    roomID: room.id
  };
};

export const incrementUnreadMessageCounter = (channelName) => {
    console.log("room in inc in RoomActions",channelName)
  return {
    type: "INCREMENT_UNREAD_MESSAGE_COUNTER",
    channelName: channelName
  };
};

export const toggleCurrentRoomField = (toggledRoom) => {
  return {
    type: 'TOGGLE_CURRENT_ROOM',
    // id: (nextMessageId++).toString(),
    id: toggledRoom.id,
    channelName: !toggleRoom.channelName //set from true to false or vice versa
  };
};