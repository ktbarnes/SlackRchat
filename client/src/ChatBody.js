import React, { PropTypes } from 'react';
import Message from './Message';
import { connect } from 'react-redux';

const MessageList = ( {messages} ) => {

  return (
    <ul id="messages">
      {messages.map(message =>
        <Message
          key={message.id}
          message={message.text}
        />
      )}
    </ul>
  )
}

// MessageList.propTypes = {
//   dataStore: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     text: PropTypes.string.isRequired,
//   }).isRequired).isRequired,
// };

const mapStateToProps = (state, ownProps) => {
  return { messages: state.ChatReducer }
};

export default connect(mapStateToProps)(MessageList);