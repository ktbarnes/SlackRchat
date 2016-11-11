const ChatReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_MESSAGE':
      return [
        ...state,
        {
          id: action.id || null,
          text: action.text,
          channelID: action.channelID || 2,
          updated_at: action.updated_at || "",
          created_at: action.created_at || "",
        },
      ];
    
    default:
      return state;
  }
};

export default ChatReducer;