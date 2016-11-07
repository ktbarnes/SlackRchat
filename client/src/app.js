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

import React from 'react';
import ChatForm from './chatForm.js';
import ChatBody from './ChatBody.js';

class PrimaryChatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChat: ''
    };
  }

  componentDidMount() {
    // var socket = io();
  }

  socketBind(chat) {
    console.log("chat?",chat);
    // var socket = io();
    // socket.emit('chat message', chat);
    this.setState({
      currentChat: chat
    });
  }

  render() {
    return (
      <div>

        <ChatBody messages={this.state.currentChat}/>

        <ChatForm 
          handleSearchInputChange={this.socketBind.bind(this)}
        />

      </div>
    );
  }
}

export default PrimaryChatroom

// class PrimaryChatroom extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       // videos: [],
//       // currentVideo: null
//     };
//   }

//   // componentDidMount() {
//   //   // this.getYouTubeVideos('react tutorials');
//   // }

//   // getYouTubeVideos(query) {
//   //   var options = {
//   //     key: this.props.API_KEY,
//   //     query: query
//   //   };

//   //   this.props.searchYouTube(options, (videos) =>
//   //     this.setState({
//   //       videos: videos,
//   //       currentVideo: videos[0]
//   //     })
//   //   );
//   // }

//   // handleVideoListEntryTitleClick(video) {
//   //   this.setState({
//   //     currentVideo: video
//   //   });
//   // }

//   render() {
//     return (
//       <div>

//         <div>
//           <ChatBody />
//         </div>

//         <ChatForm
//           // handleSearchInputChange={this.getYouTubeVideos.bind(this)}
//         />

//       </div>
//     );
//   }
// }

// export default PrimaryChatroom