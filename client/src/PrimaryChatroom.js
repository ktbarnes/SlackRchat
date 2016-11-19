import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import ChatForm from './chatForm.js';
import MessageList from './ChatBody.js';
import Message from './Message.js';
import { addMessageFromSocket, addMessageFromDB } from '../actions/ChatActions';
import { addRoom } from '../actions/RoomActions';
import { addUser } from '../actions/UserActions';
import { setCurrentUser } from '../actions/CurrentUserActions';
import { setCurrentRoom } from '../actions/CurrentRoomActions';

class PrimaryChatroom extends React.Component {

  constructor(props){
    super(props)
    // this.socket = io('/Hack-Reactor-NameSpace');
    // console.log("what are my props",this.props)
  }

  componentDidMount() {
    this.downloadAllMessages();
  }
  
  handleReceive(cb,body) {
    this.props.dispatch(cb(body));
  }

  downloadAllMessages() {

    //from channel_messages
    axios.get('/db/messages')
    .then(res => {
      res.data.forEach(msg => {
        let eachMsg = {
          id: msg.id,
          username: msg.username,
          userIDinDB: msg.userIDinDB,
          channelName: msg.channelName,
          channelIDinDB: msg.channelIDinDB,
          text: msg.message,
          url: msg.url,
          created_at: msg.created_at
        }
        this.handleReceive(addMessageFromDB,eachMsg);
      });
    });

    //from DM_messages
    axios.get('/db/DMMessages')
    .then(res => {
      res.data.forEach(msg => {
        let eachMsg = {
          id: msg.id,
          username: msg.author,
          userIDinDB: msg.userIDinDB,
          channelName: msg.channelName,
          channelIDinDB: msg.channelIDinDB,
          text: msg.message,
          url: msg.url,
          created_at: msg.created_at
        }
        this.handleReceive(addMessageFromDB,eachMsg);
      });
    });

  }

  render(){
    return (
      <div>
        <div>
          <MessageList />
          <Message />
        </div>
        <div>
          <ChatForm socket={this.props.theSocket} />
        </div>
      </div>
    )
  }
}


PrimaryChatroom.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  // console.log("current User",state.allReducers.CurrentUserReducer)
  return { 
    rooms: state.allReducers.RoomReducer,
    currentUser: state.allReducers.CurrentUserReducer,
    currentRoom: state.allReducers.CurrentRoomReducer
  }
};

export default connect(mapStateToProps)(PrimaryChatroom);