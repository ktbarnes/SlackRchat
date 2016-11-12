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
    this.allMessages;
  }

  componentDidMount() {
    let that = this;
    // this.props.dispatch(downloadAllMessages());
    this.allMessages = this.downloadAllMessages();
    this.socket.on('chat message', txt => that.handleReceiveMessage(addMessageFromSocket,{text: txt}) );
    this.socket.on('disconnected', txt => that.handleReceiveMessage(addMessageFromSocket,{text: txt}) );
    this.socket.on('someoneJoin', txt => that.handleReceiveMessage(addMessageFromSocket,{text: txt}) );
    
    //room stuff
    // that.room = this.room;
    this.socket.on('connect', () => this.socket.emit('changeRoom', that.room));

  }
  
  handleReceiveMessage(cb,chat) {
    console.log("what is chat",chat);
    this.props.dispatch(cb(chat));
  }

  downloadAllMessages() {
    axios.get('/db/messages')
    .then( (res) => {
      res.data.forEach( (msg) => {
        let eachMsg = {
          id: msg.id,
          channelID: msg.channelID,
          text: msg.message,
          created_at: msg.created_at,
          updated_at: msg.updated_at
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