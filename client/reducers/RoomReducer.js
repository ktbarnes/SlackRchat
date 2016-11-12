const RoomReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_ROOM':
      return [
        ...state,
        {
          id: action.id,
          channelName: action.channelName,
        },
      ];
    
    default:
      return state;
  }
};

export default RoomReducer;