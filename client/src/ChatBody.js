import React, { PropTypes } from 'react';
import Message from './Message';
import { connect } from 'react-redux';


//Note: this.room is passed in from PrimaryChatroom as a prop here. That represents "current" room

const MessageList = ( {messages, room} ) => {

  return (
    <div>
      You are in room: { room }
      <ul id="messages">
        {messages.map(message => 
          <Message
            key={message.id}
            username={message.username}
            text={message.text}
            created_at={message.created_at}
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
  // console.log("what is the array of messages",state.allReducers.ChatReducer)
  return { 
    messages: state.allReducers.ChatReducer,
    rooms: state.allReducers.RoomReducer
  }
};

export default connect(mapStateToProps)(MessageList);