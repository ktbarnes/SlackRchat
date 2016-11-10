// WORKING CODE. SCROLL DOWN TO SEE REFACTORED SOLUTION USING REDUX
// import React from 'react';

// const ChatBody = ({message}) => (
//   <li>{message}</li>
// );

// export default ChatBody





import React, { PropTypes } from 'react';
import Message from './Message';


//passes in reducer here, which takes in an initial state
const MessageList = ( { value } ) => {
  console.log("VALUE?????",{value});
  return (
      <ul>
        {value.map(message =>
          <Message
            key={message.id}
            message={message.text}
          />
        )}
      </ul>
  )
  
}

MessageList.propTypes = {
  value: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default MessageList;