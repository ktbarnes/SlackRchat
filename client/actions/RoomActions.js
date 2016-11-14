let nextMessageId = 1000;
//because in the Reducer, we are declaring an initial room called 'default' with ID=0

export const addRoom = (eachRoom) => {
  return {
    type: 'ADD_ROOM',
    // id: (nextMessageId++).toString(),
    id: eachRoom.id,
    channelName: eachRoom.channelName,
    currentRoomToggle: eachRoom.currentRoomToggle
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