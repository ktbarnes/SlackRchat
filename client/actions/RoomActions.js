let nextMessageId = 1;
//because in the Reducer, we are declaring an initial room called 'default' with ID=0

export const addRoom = (room) => {
  return {
    type: 'ADD_ROOM',
    id: (nextMessageId++).toString(),
    room,
  };
};