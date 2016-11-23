import axios from 'axios';
import React, { PropTypes } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Picker } from 'emoji-mart';
import { FormGroup, Button } from 'react-bootstrap';

let stuff = '';

const ChatForm = ( { socket, currentRoom, currentUser } ) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          // console.log("what room is being passed in",currentRoom)
          e.preventDefault();
          if (!input.value.trim()) { return; }

          if (input.value.substring(0,7) === '/giphy ') {
            axios.post('/api/giphy',{giphy: input.value.substring(7)})
            .then(giphy => {
              // console.log(giphy.data);
              if (giphy.data === '') return input.value = '';
              // console.log(giphy.data);
              socket.emit('chat message', {
                channelName: currentRoom.channelName, 
                channelID: currentRoom.id,
                username: currentUser.username,
                msg: input.value,
                url: giphy.data.images.fixed_height.url,
                picture: currentUser.picture,       
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
                { headers: { "Authorization": "Bearer "+localStorage.getItem('id_token') } })
                .then(() => console.log("message sent to DB!"))
                .catch((err) => console.error(err))            
              } else { //if direct message
                axios.post('/db/DMMessages',{
                  DM_roomID: currentRoom.id,
                  message: input.value
                },
                { headers: { "Authorization": "Bearer "+localStorage.getItem('id_token') } })
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
              msg: input.value,
              picture: currentUser.picture,
            });
            //if channel
            if(currentRoom.aliasName === "Channel_NotDM"){
              //post to the channel_messages schema
              axios.post('/db/messages',{
                channelName: currentRoom.channelName,
                channelID: currentRoom.id,
                message: input.value,
              },
              { headers: { "Authorization": "Bearer "+localStorage.getItem('id_token') } })
              .then(() => console.log("message sent to DB!"))
              .catch((err) => console.error(err))            
            } else {
              axios.post('/db/DMMessages',{
                DM_roomID: currentRoom.id,
                message: input.value
              },
              { headers: { "Authorization": "Bearer "+localStorage.getItem('id_token') } })
              .then(() => console.log("message sent to DB!"))
              .catch((err) => console.error(err))              
            }
            input.value = '';
          }

        }}
      > 
        <FormGroup bsSize="large">
          <input ref={node => { input = node; }} />
          <Button type="submit">Send</Button>
        </FormGroup>

        
          { stuff &&
            <Picker
              emojiSize={20}
              perLine={9}
              skin={1}
              set='apple'
              onClick={emoji => input.value += emoji.colons}
            />
          }
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


