/*
Note to reader:
These actions manage the channels downloaded from the database. 
There is also logic for toggling a room from being "subscribed" by a user
to not being "subscribed" by that user. 

Also has an imcrementing unread messages counter that increments when the user is in a room
that is not the room where the message is received. 

Lastly, there is the currentRoomToggle field and actions. Those aren't ultimately used in this application,
but we keep it here in case we want to use it in the future. 

The corresponding reducer is called RoomReducer.js
*/

let nextMessageId = 1000;
//because in the Reducer, we are declaring an initial room called 'default' with ID=0

export const addRoom = (eachRoom) => {
  return {
    type: 'ADD_ROOM',
    id: eachRoom.id,
    channelName: eachRoom.channelName,
    aliasName: "Channel_NotDM",
    currentRoomToggle: eachRoom.currentRoomToggle,
    AmISubscribedToggle: eachRoom.AmISubscribedToggle,
    unreadMessageCounter: 0
  };
};

export const toggleSubscribeRoomOff = (room) => {
  return {
    type: "TOGGLE_SUBSCRIBED_ROOM_OFF",
    roomID: room.id
  };
};

//this one uses channelName instead of roomID because the dropdown in LeftSidebar is based on Name, not ID
export const toggleSubscribeRoomOn = (channelName) => {
    console.log("channel in toggleSubscribeOn in RoomActions",channelName)
  return {
    type: "TOGGLE_SUBSCRIBED_ROOM_ON",
    channelName: channelName
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
    id: toggledRoom.id,
    channelName: !toggleRoom.channelName //set from true to false or vice versa
  };
};