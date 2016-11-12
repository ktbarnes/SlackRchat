const RoomReducer = (state = [ { id: 0, room: "Lobby" } ], action) => {
  switch (action.type) {

    case 'ADD_ROOM':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
        },
      ];
    
    default:
      return state;
  }
};

export default RoomReducer;