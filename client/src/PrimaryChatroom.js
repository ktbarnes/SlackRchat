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
    console.log("what are my props",this.props)
  }

  componentDidMount() {
    this.downloadAllRooms();
    this.downloadAllMessages();
    this.downloadAllUsers();
    this.props.theSocket.on('chat message', 
      incoming => 
      this.handleReceive(addMessageFromSocket,{
        channelName: incoming.channelName,
        channelID: incoming.channelID,
        username: incoming.username,
        text: incoming.text,

      }));
    this.props.theSocket.on('disconnected', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    this.props.theSocket.on('someoneJoin', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    
    //room stuff
    this.props.theSocket.on('connect', () => this.props.theSocket.emit('changeRoom', this.props.currentRoom.channelName)); //default to Lobby when connected

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
    this.currentRoom = this.props.currentRoom.channelName;
    axios.get('/db/channels')
    .then( (res) => {
      res.data.forEach( (msg) => {
        let eachRoom = {
          id: msg.id,
          channelName: msg.name,
          currentRoomToggle: (() => (this.currentRoom === msg.name) ? true : false)()
        }
        this.handleReceive(addRoom,eachRoom);
        if(this.currentRoom === msg.name){
          this.handleReceive(setCurrentRoom,eachRoom);
        }
      });
    });
  }

  downloadAllUsers() {

    //get from server who current user is
    this.currentUserIDfromDB;
    axios.get('/db/getMe',
    {
    headers: { "authorization": "Bearer "+localStorage.getItem('id_token') }
    })
    .then( (res) => {
      // console.log("who is my user???",res.data)
      this.currentUserIDfromDB = res.data.currentUserID;
      //now download all users
      axios.get('/db/users')
      .then( (resp) => {
        // console.log("what comes in from the DB?",resp)
        resp.data.forEach( (person) => {
          let eachUser = {
            id: person.id,
            username: person.username,
            email: person.email,
            currentUserToggle: (() => (this.currentUserIDfromDB === person.id) ? true : false)()
          }
          this.handleReceive(addUser,eachUser);
          if(this.currentUserIDfromDB === person.id){
            this.handleReceive(setCurrentUser,eachUser);
          }
        });
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
  // console.log("current room",state.allReducers.CurrentRoomReducer)
  return { 
    rooms: state.allReducers.RoomReducer,
    currentUser: state.allReducers.CurrentUserReducer,
    currentRoom: state.allReducers.CurrentRoomReducer
  }
};

export default connect(mapStateToProps)(PrimaryChatroom);