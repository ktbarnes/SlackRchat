import React, { PropTypes } from 'react';
import Message from './Message';
import { connect } from 'react-redux';

const MessageList = ( {messages, room} ) => {

  return (
    <div>
      You are in room: { room }
      <ul id="messages">
        {messages.map(message =>
          <Message
            key={message.id}
            message={message.text}
          />
        )}
      </ul>
    </div>
  )
}

// MessageList.propTypes = {
//   dataStore: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     text: PropTypes.string.isRequired,
//   }).isRequired).isRequired,
// };

const mapStateToProps = (state, ownProps) => {
  console.log(state.allReducers.ChatReducer);
  return { messages: state.allReducers.ChatReducer }
};

export default connect(mapStateToProps)(MessageList);