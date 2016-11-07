import React from 'react';
import ChatForm from './chatForm.js';
import ChatBody from './ChatBody.js';

let socket = io();

class PrimaryChatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChat: []
    };
    this.handleReceiveMessage = this.handleReceiveMessage.bind(this);
  }

  componentDidMount() {
    let that = this;
    socket.on('chat message', function(message){
      that.handleReceiveMessage(message);
    });
  }


  handleReceiveMessage(chat) {
    let newChat = this.state.currentChat.concat(chat);
    this.setState({
      currentChat: newChat
    });
  }

  socketEmitMessage(chat) {
    socket.emit('chat message', chat);
  }

  render() {

    let chatMap = this.state.currentChat.map((msg, i) => 
      <ChatBody message={msg} key={i} />
    )

    return (
      <div>

        <ul id="messages">
        {chatMap}
        </ul>

        <ChatForm 
          handleSearchInputChange={this.socketEmitMessage.bind(this)}
        />

      </div>
    );
  }
}

export default PrimaryChatroom

//GUTTER: DO NOT USE THIS STUFF BELOW. FOR REFERENCE ONLY
// var socket = io();
// $('form').submit(function(){
//   socket.emit('chat message', $('#m').val());
//   $('#m').val('');
//   return false;
// });
// socket.on('chat message', function(msg){
//   $('#messages').append($('<li>').text(msg));
// });
// socket.on('disconnect', function(){
//   console.log('a user has left.... aw man');
//   $('#messages').append($('<li>').text('a user has left the room'));
// });
      
// console.log('Hello World! Why are you so awesome?');