export const setCurrentRoom = (room) => {
  console.log("what is my current room line 2?",room);
  return {
    type: 'SET_CURRENT_ROOM',
    id: room.id,
    channelName: room.channelName,
    currentRoomToggle: true
  };
};