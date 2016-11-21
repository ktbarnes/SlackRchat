import React, { PropTypes } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import axios from 'axios';

//Note: this.room is passed in from PrimaryChatroom as a prop here. That represents "current" room

const MessageList = ( {messages, currentUser, currentRoom} ) => {
  // console.log("Last message", messages[messages.length - 1])
  let filtered = messages.filter(message => {
    return message.channelName === currentRoom.channelName || message.channelName === undefined;
  });
  // let filtered = filtered.map(message => axios.post('/db/profpic',{username: message.username}).then(data=> message.))

  return (
    <div>
      { 
        (currentRoom.aliasName === "Channel_NotDM") ? ("You are in channel: " + currentRoom.channelName) : 
        ("Private chat between " + currentRoom.user2username + " and " + currentRoom.user1username)
      }
      <ul id="messages">
        {filtered.map(message => 
          <Message
            key={message.id}
            username={message.username}
            text={message.text}
            created_at={message.created_at}
            url={message.url}
            picture={message.picture}
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
  // console.log("what is the array of messages",state.allReducers.CurrentRoomReducer)
  return { 
    messages: state.allReducers.ChatReducer,
    rooms: state.allReducers.RoomReducer,
    current: state.allReducers.CurrentUserReducer,
    currentRoom: state.allReducers.CurrentRoomReducer
  }
};

export default connect(mapStateToProps)(MessageList);