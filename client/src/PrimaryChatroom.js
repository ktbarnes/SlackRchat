import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import ChatForm from './chatForm.js';
import MessageList from './ChatBody.js';
import Message from './Message.js';
import { addMessageFromSocket, addMessageFromDB } from '../actions/ChatActions';

class PrimaryChatroom extends React.Component {

  constructor(props){
    super(props)
    this.socket = io('/Hack-Reactor-NameSpace');
    // console.log("what are props",this.props);
    this.room = this.props.rooms[0].room;
  }

  componentDidMount() {
    this.downloadAllMessages();
    this.socket.on('chat message', txt => this.handleReceiveMessage(addMessageFromSocket,{text: txt}) );
    this.socket.on('disconnected', txt => this.handleReceiveMessage(addMessageFromSocket,{text: txt}) );
    this.socket.on('someoneJoin', txt => this.handleReceiveMessage(addMessageFromSocket,{text: txt}) );
    
    //room stuff
    this.socket.on('connect', () => this.socket.emit('changeRoom', this.room));

  }
  
  handleReceiveMessage(cb,chat) {
    this.props.dispatch(cb(chat));
  }

  downloadAllMessages() {
    axios.get('/db/messages')
    .then( (res) => {
      res.data.forEach( (msg) => {
        let eachMsg = {
          id: msg.id,
          username: msg.username,
          channel: msg.channel,
          text: msg.message,
          created_at: msg.created_at
        }
        this.handleReceiveMessage(addMessageFromDB,eachMsg);
      });
    });

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