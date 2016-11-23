import axios from 'axios';
import React, { PropTypes } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Picker } from 'emoji-mart';
import { FormGroup, Button } from 'react-bootstrap';

let stuff = '';

//= ( { socket, currentRoom, currentUser } ) => 
class ChatForm extends React.Component {
  constructor(props){
    super(props);
    this.input;
    this.state = {
      stuff: ""
    }
  }

  render(){
    return (
      <div>
        <form
          onSubmit={e => {
            // console.log("what room is being passed in",currentRoom)
            e.preventDefault();
            if (!this.input.value.trim()) { return; }

            if (this.input.value.substring(0,7) === '/giphy ') {
              axios.post('/api/giphy',{giphy: this.input.value.substring(7)})
              .then(giphy => {
                // console.log(giphy.data);
                if (giphy.data === '') return this.input.value = '';
                // console.log(giphy.data);
                this.props.socket.emit('chat message', {
                  channelName: this.props.currentRoom.channelName, 
                  channelID: this.props.currentRoom.id,
                  username: this.props.currentUser.username,
                  msg: this.input.value,
                  url: giphy.data.images.fixed_height.url,
                  picture: this.props.currentUser.picture,       
                });
                //if channel
                if(this.props.currentRoom.aliasName === "Channel_NotDM"){
                  //post to the channel_messages schema
                  axios.post('/db/messages',{
                    channelName: this.props.currentRoom.channelName,
                    channelID: this.props.currentRoom.id,
                    message: this.input.value,
                    url: giphy.data.images.fixed_height.url
                  },
                  { headers: { "Authorization": "Bearer "+localStorage.getItem('id_token') } })
                  .then(() => console.log("message sent to DB!"))
                  .catch((err) => console.error(err))            
                } else { //if direct message
                  axios.post('/db/DMMessages',{
                    DM_roomID: this.props.currentRoom.id,
                    message: this.input.value,
                    url: giphy.data.images.fixed_height.url,
                  },
                  { headers: { "Authorization": "Bearer "+localStorage.getItem('id_token') } })
                  .then(() => console.log("message sent to DB!"))
                  .catch((err) => console.error(err))              
                }
                this.input.value = '';
              });
            } else {
            //this is where it pushes to the socket
              this.props.socket.emit('chat message', {
                channelName: this.props.currentRoom.channelName, 
                channelID: this.props.currentRoom.id,
                username: this.props.currentUser.username,
                msg: this.input.value,
                picture: this.props.currentUser.picture,
              });
              //if channel
              if(this.props.currentRoom.aliasName === "Channel_NotDM"){
                //post to the channel_messages schema
                axios.post('/db/messages',{
                  channelName: this.props.currentRoom.channelName,
                  channelID: this.props.currentRoom.id,
                  message: this.input.value,
                },
                { headers: { "Authorization": "Bearer "+localStorage.getItem('id_token') } })
                .then(() => console.log("message sent to DB!"))
                .catch((err) => console.error(err))            
              } else {
                axios.post('/db/DMMessages',{
                  DM_roomID: this.props.currentRoom.id,
                  message: this.input.value
                },
                { headers: { "Authorization": "Bearer "+localStorage.getItem('id_token') } })
                .then(() => console.log("message sent to DB!"))
                .catch((err) => console.error(err))              
              }
              this.input.value = '';
            }

          }}
        > 
          <FormGroup bsSize="large">
            <input ref={node => { this.input = node; }} />
            <Button type="submit">Send</Button>
          </FormGroup>

          
            { this.stuff &&
              <Picker
                emojiSize={20}
                perLine={9}
                skin={1}
                set='apple'
                onClick={emoji => this.input.value += emoji.colons}
              />
            }
        </form>
      </div>
    );
  }


};

const mapStateToProps = (state, ownProps) => {
  // console.log("who is my current user?",state.allReducers.CurrentUserReducer)
  return { 
    currentRoom: state.allReducers.CurrentRoomReducer,
    currentUser: state.allReducers.CurrentUserReducer
  }
};

export default connect(mapStateToProps)(ChatForm);


