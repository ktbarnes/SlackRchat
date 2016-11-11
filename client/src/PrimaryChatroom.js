import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import ChatForm from './chatForm.js';
import MessageList from './ChatBody.js';
import Message from './Message.js';
import { addMessage } from '../actions/ChatActions';

class PrimaryChatroom extends React.Component {

  constructor(props){
    super(props)
    this.socket = io('/Hack-Reactor-NameSpace');
    // console.log("what are props",this.props);
    this.room = this.props.rooms[0].room;
    this.allMessages;
  }

  componentDidMount() {
    let that = this;
    // this.props.dispatch(downloadAllMessages());
    this.allMessages = this.downloadAllMessages();
    this.socket.on('chat message', message => that.handleReceiveMessage(message) );
    this.socket.on('disconnected', message => that.handleReceiveMessage(message) );
    this.socket.on('someoneJoin', message => that.handleReceiveMessage(message) );
    
    //room stuff
    that.room = this.room;
    this.socket.on('connect', () => that.socket.emit('changeRoom', that.room));

  }
  
  handleReceiveMessage(chat) {
    this.props.dispatch(addMessage(chat));
  }

  downloadAllMessages() {
    this.allMessages = axios.get('/api/messages');
    console.log("what are my messages",this.allMessages)
    // .then( (res) => {
    //   //some code
    //   return res.map( (message) => {
    //     return {
    //       "id": message.id,
    //       "channelID": message.channelID,
    //       "text": message.message,
    //       "created_at": message.created_at,
    //       "updated_at": message.updated_at
    //     }
    //   });
    // });
  }

  render(){
    return (
      <div>
        <div>
          <MessageList room={this.room}/>
          <Message />
        </div>
        <div>
          <ChatForm socket={this.socket} room={this.room} />
        </div>
      </div>
    )
  }
}


PrimaryChatroom.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return { rooms: state.allReducers.RoomReducer }
};

export default connect(mapStateToProps)(PrimaryChatroom);