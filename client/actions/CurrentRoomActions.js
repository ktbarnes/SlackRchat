export const setCurrentRoom = (room) => {
  return {
    type: 'SET_CURRENT_ROOM',
    id: room.id,
    channelName: room.channelName,
    aliasName: room.aliasName || "Channel_NotDM",
    user1username: room.user1username || "Channel_NotDM",
    user2username: room.user2username || "Channel_NotDM",
    currentRoomToggle: true
  };
};