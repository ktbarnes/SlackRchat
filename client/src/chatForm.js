import axios from 'axios';
import React, { PropTypes } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Picker } from 'emoji-mart';
import { FormGroup, Button, Popover, OverlayTrigger } from 'react-bootstrap';


class ChatForm extends React.Component {
  constructor(props){
    super(props);
    this.input;
    this.state = {
      show: false
    }
  }

  /*
  Fair bit of conditional logic in this component. This component is basically the input field for 
  messages that are typed in by the user. 
  The form starts by:
  1 - checking wehther the input is valid. If not, simply return
  2 - Check to see whether the first six characters are '/giphy'. If they are,
     post that image to the socket and also send its link to the database
     There is additional conditional logic to determine whether that persisted message
     in the database should go to the channel_messages database or the DM_messages database
     by checking the currentRoom property to see whether it's a channel, marked by "Channel_NotDM"
     or just a DM room
  3 - If not a giphy, all of the same as above happens, except what's sent to the database and
    through the socket will just not include any giphy image references
  4 - The component further allows for emojis, which are made possible through the Picker component
    downloaded as an npm dependency
  */

  render(){
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!this.input.value.trim()) { return; }

            if (this.input.value.substring(0,7) === '/giphy ') {
              axios.post('/api/giphy',{giphy: this.input.value.substring(7)})
              .then(giphy => {
                if (giphy.data === '') return this.input.value = '';
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
            <OverlayTrigger trigger={'click'} rootClose placement="top" overlay={
              <Popover id="popover-trigger-click-root-close">
                <Picker
                  emojiSize={20}
                  perLine={7}
                  skin={1}
                  set='apple'
                  onClick={emoji => this.input.value += emoji.colons}
                />
              </Popover>
              }>
              <Button>Emojis</Button>
            </OverlayTrigger>
            <Button type="submit">Send</Button>
          </FormGroup>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { 
    currentRoom: state.allReducers.CurrentRoomReducer,
    currentUser: state.allReducers.CurrentUserReducer
  }
};

export default connect(mapStateToProps)(ChatForm);