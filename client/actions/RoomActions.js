let nextMessageId = 1000;
//because in the Reducer, we are declaring an initial room called 'default' with ID=0

export const addRoom = (eachRoom) => {
  return {
    type: 'ADD_ROOM',
    // id: (nextMessageId++).toString(),
    id: eachRoom.id,
    channelName: eachRoom.channelName
  };
};