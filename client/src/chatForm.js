import axios from 'axios';
import React, { PropTypes } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

const ChatForm = ( { socket, currentRoom, currentUser } ) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          // console.log("what room is being passed in",currentRoom)
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }

          //this is where it pushes to the socket
          socket.emit('chat message', {
            channelName: currentRoom.channelName, 
            channelID: currentRoom.id,
            username: currentUser.username,
            msg: input.value
          });

          //this is where you will issue a POST request to the database

          //if channel
          if(currentRoom.aliasName === "Channel_NotDM"){
            //post to the channel_messages schema
            axios.post('/db/messages',{
              channelName: currentRoom.channelName,
              channelID: currentRoom.id,
              message: input.value
            },
            {
              headers: { "Authorization": "Bearer "+localStorage.getItem('id_token') }
            })
            .then(() => console.log("message sent to DB!"))
            .catch((err) => console.error(err))            
          } 
          else {
            axios.post('/db/DMMessages',{
              DM_roomID: currentRoom.id,
              message: input.value
            },
            {
              headers: { "Authorization": "Bearer "+localStorage.getItem('id_token') }
            })
            .then(() => console.log("message sent to DB!"))
            .catch((err) => console.error(err))              
          }

          //reinitialize the input field
          input.value = '';
        }}
      >
        <input ref={node => { input = node; }} />
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log("who is my current user?",state.allReducers.CurrentUserReducer)
  return { 
    currentRoom: state.allReducers.CurrentRoomReducer,
    currentUser: state.allReducers.CurrentUserReducer
  }
};

export default connect(mapStateToProps)(ChatForm);


