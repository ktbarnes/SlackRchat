
import React, { PropTypes } from 'react';
import Message from './Message';

const MessageList = ( { value } ) => {
  return (
      <ul id="messages">
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