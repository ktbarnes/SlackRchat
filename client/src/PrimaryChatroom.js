import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import ChatForm from './chatForm.js';
import MessageList from './ChatBody.js';
import Message from './Message.js';
import { addMessageFromSocket, addMessageFromDB } from '../actions/ChatActions';
import { addRoom } from '../actions/RoomActions';
import { addUser } from '../actions/UserActions';

class PrimaryChatroom extends React.Component {

  constructor(props){
    super(props)
    this.socket = io('/Hack-Reactor-NameSpace');
  }

  componentDidMount() {
    this.downloadAllRooms();
    this.downloadAllMessages();
    this.downloadAllUsers();
    this.socket.on('chat message', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    this.socket.on('disconnected', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    this.socket.on('someoneJoin', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    
    //room stuff
    this.socket.on('connect', () => this.socket.emit('changeRoom', "Lobby")); //default to Lobby when connected

  }
  
  handleReceive(cb,body) {
    this.props.dispatch(cb(body));
  }

  downloadAllMessages() {
    axios.get('/db/messages')
    .then( (res) => {
      res.data.forEach( (msg) => {
        let eachMsg = {
          id: msg.id,
          username: msg.username,
          userIDinDB: msg.userIDinDB,
          channelName: msg.channelName,
          channelIDinDB: msg.channelIDinDB,
          text: msg.message,
          created_at: msg.created_at
        }
        this.handleReceive(addMessageFromDB,eachMsg);
      });
    });
  }

  downloadAllRooms() {
    axios.get('/db/channels')
    .then( (res) => {
      res.data.forEach( (msg) => {
        let eachRoom = {
          id: msg.id,
          channelName: msg.name,
        }
        this.handleReceive(addRoom,eachRoom);
        this.room = this.props.rooms[0].channelName; //need to make this better
      });
    });
  }

  downloadAllUsers() {
    axios.get('/db/users')
    .then( (res) => {
      console.log("what comes in from the DB?",res)
      res.data.forEach( (person) => {
        let eachUser = {
          id: person.id,
          username: person.username,
          email: person.email
        }
        this.handleReceive(addUser,eachUser);
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
  console.log("users",state.allReducers.UserReducer)
  return { rooms: state.allReducers.RoomReducer }
};

export default connect(mapStateToProps)(PrimaryChatroom);