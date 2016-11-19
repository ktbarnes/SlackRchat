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

          console.log('before input.value check', input.value);
          if (input.value.substring(0,7) === '/giphy ') {
            axios.post('/api/giphy',{giphy: input.value.substring(7)})
            .then(giphy => {
              console.log(giphy.data);
              socket.emit('chat message', {
                channelName: currentRoom.channelName, 
                channelID: currentRoom.id,
                username: currentUser.username,
                msg: input.value,
                url: giphy.data.images.fixed_height.url,       
              });
              //if channel
              if(currentRoom.aliasName === "Channel_NotDM"){
                //post to the channel_messages schema
                axios.post('/db/messages',{
                  channelName: currentRoom.channelName,
                  channelID: currentRoom.id,
                  message: input.value,
                  url: giphy.data.images.fixed_height.url
                },
                {
                  headers: { "Authorization": "Bearer "+localStorage.getItem('id_token') }
                })
                .then(() => console.log("message sent to DB!"))
                .catch((err) => console.error(err))            
              } else {
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
              input.value = '';
            });
          } else {
          //this is where it pushes to the socket
            socket.emit('chat message', {
              channelName: currentRoom.channelName, 
              channelID: currentRoom.id,
              username: currentUser.username,
              msg: input.value
            });
            //if channel
            if(currentRoom.aliasName === "Channel_NotDM"){
              //post to the channel_messages schema
              axios.post('/db/messages',{
                channelName: currentRoom.channelName,
                channelID: currentRoom.id,
                message: input.value,
              },
              {
                headers: { "Authorization": "Bearer "+localStorage.getItem('id_token') }
              })
              .then(() => console.log("message sent to DB!"))
              .catch((err) => console.error(err))            
            } else {
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
            input.value = '';
          }
          //this is where you will issue a POST request to the database

          //reinitialize the input field
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


