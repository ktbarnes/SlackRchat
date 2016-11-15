const ChatReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_MESSAGE_FROM_SOCKET':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          username: action.username,
          channelName: action.channelName,
          channelID: action.channelID,
          created_at: action.created_at || "",
        },
      ];

    case 'ADD_MESSAGE_FROM_DB':
      return [
        ...state,
        {
          id: action.id,
          username: action.username,
          userIDinDB: action.userIDinDB,
          channelName: action.channelName,
          channelIDinDB: action.channelIDinDB,
          text: action.text,
          created_at: action.created_at,
        },
      ];
    
    default:
      return state;
  }
};

export default ChatReducer;