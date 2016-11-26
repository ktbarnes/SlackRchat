import React, { PropTypes } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import axios from 'axios';
import { Media } from 'react-bootstrap';

/*
Note to user: 
This file is the rendered list of messages that are downloaded from the database. 
"Messages" is a prop passed in from the store. 
See that those that render are only those that will be specific to the room, i.e. 
through the "filtered" variable declared upfront

Each message is a Message component, written in the Message.js file

In the return statement, you'll see that the name of the current room is initially rendered,
based on whether the room itself is marked as a Channel vs. Direct Message room
*/

const MessageList = ( {messages, currentRoom} ) => {

  let filtered = messages.filter(message => {
    return message.channelName === currentRoom.channelName || message.channelName === undefined;
  });

  return (
    <div>
      <h4>
        {(currentRoom.aliasName === "Channel_NotDM") ? ("You are in channel: " + currentRoom.channelName) : 
        ("Private chat between " + currentRoom.user2username + " and " + currentRoom.user1username) }
      </h4>
      
      <div className="chatBody">
        <div id="messages">
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
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return { 
    messages: state.allReducers.ChatReducer,
    currentRoom: state.allReducers.CurrentRoomReducer
  }
};

export default connect(mapStateToProps)(MessageList);