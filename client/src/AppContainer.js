import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import ReactDOM from 'react-dom';
import SideBar from '../lib/SideBar-modified.js';
import Nav from './nav.js';
import PrimaryChatroom from './PrimaryChatroom.js';
import LeftSideBar from './LeftSideBar.js';
import RightSideBar from './RightSideBar.js';
import { addMessageFromSocket, addMessageFromDB } from '../actions/ChatActions';
import { addRoom } from '../actions/RoomActions';
import { addUser } from '../actions/UserActions';
import { setCurrentUser } from '../actions/CurrentUserActions';
import { setCurrentRoom } from '../actions/CurrentRoomActions';

class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.socket = io('/Hack-Reactor-NameSpace');
    this.state = {
      barOpened: false,
      duration: 150,
      mode: 'over',
      side: 'right',
      size: 256,
      tolerance: 70
    }
    this.downloadAllChannels = this.downloadAllChannels.bind(this);
  }

  toggleBar() { this.setState({ barOpened: !this.state.barOpened })}
  onOpen() { this.setState({ barOpened: true })}
  onClose() { this.setState({ barOpened: false })}

  componentDidMount() {
    this.downloadAllChannels();
    // this.downloadAllMessages();
    this.downloadAllUsers();
    this.socket.on('chat message', 
      incoming => 
      this.handleReceive(addMessageFromSocket,{
        channelName: incoming.channelName,
        channelID: incoming.channelID,
        username: incoming.username,
        text: incoming.text,

      }));
    this.socket.on('disconnected', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    this.socket.on('someoneJoin', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    
    //room stuff
    this.socket.on('connect', () => this.socket.emit('changeRoom', this.props.currentRoom.channelName)); //default to Lobby when connected

  }
  
  handleReceive(cb,body) {
    this.props.dispatch(cb(body));
  }

  // downloadAllMessages() {
  //   axios.get('/db/messages')
  //   .then( (res) => {
  //     res.data.forEach( (msg) => {
  //       let eachMsg = {
  //         id: msg.id,
  //         username: msg.username,
  //         userIDinDB: msg.userIDinDB,
  //         channelName: msg.channelName,
  //         channelIDinDB: msg.channelIDinDB,
  //         text: msg.message,
  //         created_at: msg.created_at
  //       }
  //       this.handleReceive(addMessageFromDB,eachMsg);
  //     });
  //   });
  // }

  downloadAllChannels() {
    this.currentRoom = this.props.currentRoom.channelName;
    axios.get('/db/channels')
    .then( (res) => {
      res.data.forEach( (msg) => {
        let eachRoom = {
          id: msg.id,
          channelName: msg.name,
          currentRoomToggle: (this.currentRoom === msg.name)
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
    { headers: { "authorization": "Bearer "+localStorage.getItem('id_token') }})
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
            currentUserToggle: (this.currentUserIDfromDB === person.id)
          }
          this.handleReceive(addUser,eachUser);
          if(this.currentUserIDfromDB === person.id){
            this.handleReceive(setCurrentUser,eachUser);
          }
        });
      });
    });
  }

  render() {
    const { barOpened, duration, mode, side, size } = this.state;
    const navIconClassName = [ 'nav-icon' ];

    if (barOpened) { navIconClassName.push('open'); }

    const bar = (<div className='side'><RightSideBar theSocket={this.socket} /></div>);

    const sideBarProps = {
      bar: bar,
      mode: mode,
      opened: barOpened,
      onOpen: this.onOpen.bind(this),
      onClose: this.onClose.bind(this),
      side: side
    };

    return (
      <SideBar {...sideBarProps}>
        <Nav />
        <div>

            <div onClick={this.toggleBar.bind(this)}>Show Active Members</div>
            <input
              onChange={this.toggleBar.bind(this)}
              type='checkbox'
              checked={barOpened} />


          <table>
            <td><LeftSideBar downloadAllChannels={this.downloadAllChannels} theSocket={this.socket} /></td>
            <td><PrimaryChatroom theSocket={this.socket} /></td>
          </table>          

        </div>
      </SideBar>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log("current room",state.allReducers.CurrentRoomReducer)
  return { 
    rooms: state.allReducers.RoomReducer,
    currentUser: state.allReducers.CurrentUserReducer,
    currentRoom: state.allReducers.CurrentRoomReducer
  }
};

export default connect(mapStateToProps)(AppContainer);