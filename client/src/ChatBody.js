import React, { PropTypes } from 'react';
import Message from './Message';
import { connect } from 'react-redux';


//Note: this.room is passed in from PrimaryChatroom as a prop here. That represents "current" room

const MessageList = ( {messages, currentRoom} ) => {

  let filtered = messages.filter( (message) => 
    message.channelName === currentRoom.channelName || message.channelName === undefined);

  return (
    <div>
      You are in room: { currentRoom.channelName }
      <ul id="messages">
        {filtered.map( (message) => 
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
    rooms: state.allReducers.RoomReducer,
    currentRoom: state.allReducers.CurrentRoomReducer
  }
};

export default connect(mapStateToProps)(MessageList);