// import React from 'react';
// import ChatForm from './chatForm.js';
// import ChatBody from './ChatBody.js';

// let socket = io();

// class PrimaryChatroom extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentChat: []
//     };
//     this.handleReceiveMessage = this.handleReceiveMessage.bind(this);
//   }

//   componentDidMount() {
//     let that = this;
//     socket.on('chat message', function(message){
//       that.handleReceiveMessage(message);
//     });
//     socket.on('disconnect', function(message){
//       that.handleReceiveMessage(message);
//     });
//   }

//   handleReceiveMessage(chat) {
//     let newChat = this.state.currentChat.concat(chat);
//     this.setState({
//       currentChat: newChat
//     });
//   }

//   socketEmitMessage(chat) {
//     socket.emit('chat message', chat);
//   }

//   render() {

//     let chatMap = this.state.currentChat.map((msg, i) => 
//       <ChatBody message={msg} key={i} />
//     )

//     return (
//       <div>

//         <ul id="messages">
//         {chatMap}
//         </ul>

//         <ChatForm 
//           handleSearchInputChange={this.socketEmitMessage.bind(this)}
//         />

//       </div>
//     );
//   }
// }

// export default PrimaryChatroom






import React from 'react';
import ChatForm from './chatForm.js';
import MessageList from './ChatBody.js';
import Message from './Message.js';
import ChatReducer from '../reducers/ChatReducer.js';

let socket = io();

class PrimaryChatroom extends React.Component {

  render(){
    const { value } = this.props
    return (
      <div>
        <ChatForm  />

      </div>
    )
  }
}

// const PrimaryChatroom = ( {state} ) => (
//   <div>
//     <ChatForm  />
//     <MessageList ChatReducer={ChatReducer}/>
//   </div>
// );

export default PrimaryChatroom;