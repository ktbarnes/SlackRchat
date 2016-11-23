import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import ReactDOM from 'react-dom';
import TopNav from './nav.js';
import PrimaryChatroom from './PrimaryChatroom.js';
import LeftSideBar from './LeftSideBar.js';
import RightSideBar from './RightSideBar.js';
import { addMessageFromSocket, addMessageFromDB } from '../actions/ChatActions';
import { addRoom, incrementUnreadMessageCounter } from '../actions/RoomActions';
import { addDMRoom, addDMRoomFromSocket } from '../actions/DMRoomActions';
import { addUser, toggleOnlineUser, toggleOfflineUser, downloadOnlineUsers } from '../actions/UserActions';
import { setCurrentUser } from '../actions/CurrentUserActions';
import { setCurrentRoom } from '../actions/CurrentRoomActions';
import { default as Fade } from 'react-fade';
import { Grid, Row, Col } from 'react-bootstrap';

class AppContainer extends React.Component {

  constructor(props){
    super(props)
    this.socket = io('/Hack-Reactor-NameSpace');
    this.state = {
      docked: false,
      open: false,
      transitions: true,
      shadow: true,
      pullRight: true
    }
    // this.downloadAllChannels = this.downloadAllChannels.bind(this);
    // this.downloadMyChannelsOnly = this.downloadMyChannelsOnly.bind(this)
    this.toggleUserDock = this.toggleUserDock.bind(this)
  }

  onSetOpen(open) {this.setState({open: open})}
  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }
  toggleUserDock(ev){this.setState({ docked: !this.state.docked })}

  componentDidMount() {
    this.downloadAllUsers();
    this.downloadAllDMRooms();
    this.downloadChannels();
    this.socket.on('chat message', 
      incoming => {
        console.log("CHAT MESSAGE", incoming)

        //add message to ChatReducer
        this.handleReceive(addMessageFromSocket,{
          channelName: incoming.channelName,
          channelID: incoming.channelID,
          username: incoming.username,
          text: incoming.text,
          url: incoming.url,
          picture: incoming.picture,
        });

        //increment unread messages only if user is not in that room
        if(incoming.channelName !== this.props.currentRoom.channelName){
          //code
          console.log("incoming.channelName",incoming.channelName)
          console.log("currentRoom.channelName",this.props.currentRoom.channelName)
          this.handleReceive(incrementUnreadMessageCounter,incoming.channelName)
        }
      }
    );

    this.socket.on('disconnected', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    
    this.socket.on('someoneJoin', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    







    this.socket.on("direct message", incoming => {
      console.log("trying to get a room", incoming.room);
      window.alert(incoming.msg)
      this.roomExists = false;
      for (let i = 0; i<this.props.DMRooms.length; i++){
        console.log("comparison of room IDs in AppCotainer line 87",incoming.room.id," ",this.props.DMRooms[i].id)
        if(incoming.room.id === this.props.DMRooms[i].id){
          console.log("inside if statement for direct messages")
          this.roomExists = true;
        }
      }
      if(!this.roomExists){ 
        console.log("adding a DM room in AppContainer while being direct messaged")
        this.handleReceive(addDMRoomFromSocket,incoming.room); }
      this.socket.emit('changeRoom', incoming.room.channelName)
      this.handleReceive(setCurrentRoom,incoming.room);
    });
    





    this.socket.on('connect', (txt) => {
      this.socket.emit('changeRoom', this.props.currentRoom.channelName);
      // console.log(this.props.currentUser.username,"WHO AM I???? AppContainer line 83")
      this.socket.emit("getAllLoggedInUsersFromSocket")
    }); 
    
    this.socket.on('onlineToggle ON', email => {
      console.log("who just logged in",email);
      this.handleReceive(toggleOnlineUser,email);
    });
    
    this.socket.on('onlineToggle OFF', email => {
      console.log("who just logged off",email);
      this.handleReceive(toggleOfflineUser,email);
    });
    
    this.socket.on("getAllLoggedInUsersFromSocket", onlineUsersObj => {
      console.log("TRYING TO GET A MESSAGE")
      console.log("online users Obj",onlineUsersObj)
      console.log("online users Obj keys",Object.keys(onlineUsersObj))
      if(Object.keys(onlineUsersObj).length > 0){
        Object.keys(onlineUsersObj).forEach( (email) =>
          this.handleReceive(downloadOnlineUsers,email)
        );
      }
    });
  }
  
  handleReceive(cb,body) {
    this.props.dispatch(cb(body));
  }

  downloadChannels() {
    this.currentRoom = this.props.currentRoom.channelName;
    this.currentUserIDfromDB;
    axios.get('/db/getMe',
    { headers: { "authorization": "Bearer "+localStorage.getItem('id_token') }})
    .then( (res) => {
      // console.log("who is my user???",res.data)
      this.currentUserIDfromDB = res.data.id;
      axios.post('/db/getMyChannels',{
        myUserID: this.currentUserIDfromDB
      })
      .then( (res) => {
        res.data.forEach( (msg) => {
          let eachRoom = {
            id: msg.channelIDinchannelDB,
            channelName: msg.channelName,
            currentRoomToggle: (this.currentRoom === msg.channelName),
            AmISubscribedToggle: true
          }
          this.handleReceive(addRoom,eachRoom);
          this.socket.emit('changeRoom', msg.channelName)
          if(this.currentRoom === msg.channelName){
            this.handleReceive(setCurrentRoom,eachRoom);
          }
        });
      });
    })
    .then( () => {
      axios.get('/db/channels')
      .then( (res) => {
        // console.log("downloadAllChannels in AppContainer",res.data)
        res.data.forEach( (msg) => {
          let eachRoom = {
            id: msg.id,
            channelName: msg.name,
            currentRoomToggle: false,
            AmISubscribedToggle: false
          }
          if(this.currentRoom === msg.channelName){
            this.handleReceive(setCurrentRoom,eachRoom);
          }
          //if channel does not exist in downloadMyChannelsOnly, 
          //then add to reducer with toggle false
          var isInRooms = false;
          this.props.rooms.forEach( (room) => {
            // console.log("channelName of room in store",room.channelName)
            // console.log("channelName of downloaded room",msg.name)
            if(room.channelName === msg.name){
              isInRooms = true;
            }
          });
          if(!isInRooms){this.handleReceive(addRoom,eachRoom)}
          this.socket.emit('changeRoom', msg.name)
        });
        this.socket.emit('changeRoom', this.currentRoom)
      });
    }) 
  } //end of downloadChannels

  downloadAllUsers() {
    //get from server who current user is
    // { dispatch } = this.props.dispatch;
    this.currentUserIDfromDB;
    axios.get('/db/getMe', { headers: { "authorization": "Bearer " + localStorage.getItem('id_token')}})
    .then(res => {
      console.log("CANH IS HERE in AppContainer",res.data)
      this.props.dispatch(setCurrentUser(res.data));
      // console.log('supposedly set the curretUser ',this.props.currentUser);
      //now download all users
      axios.get('/db/users')
      .then( (resp) => {
        // console.log("what comes in from the DB?",resp)
        resp.data.forEach( (person) => {
          // console.log(person.phone, "this is the persons phone number")
          let eachUser = {
            id: person.id,
            username: person.username,
            email: person.email,
            about: person.about,
            first: person.first,
            phone: person.phone,
            last: person.last,
            github: person.github,
            facebook: person.facebook,
            twitter: person.twitter,
            linkedin: person.linkedin,
            onlineToggle: false
          }
          this.handleReceive(addUser,eachUser);
          // if(this.currentUserIDfromDB === person.id){
          //   this.handleReceive(setCurrentUser,eachUser);
          // }
        });
        // console.log("email email email???",this.props.currentUser.email);
        this.socket.emit("setMyEmailInSocket",{
          email: this.props.currentUser.email,
          username: this.props.currentUser.username
        });
        this.socket.emit("someoneJoin",this.props.currentUser.username);
        this.socket.emit("getAllLoggedInUsersFromSocket")
      });
    });
  }

  downloadAllDMRooms(){
    //get from server who current user is
    this.currentUserIDfromDB;
    axios.get('/db/getMe',
    { headers: { "authorization": "Bearer "+localStorage.getItem('id_token') }})
    .then( (res) => {
      // console.log("who is my user???",res.data)
      this.currentUserIDfromDB = res.data.id;
      axios.get('/db/DMRooms')
      .then( (res) => {
        // console.log("what are the DM rooms that are downloaded",res.data)
        res.data.forEach( (msg) => {
          let eachRoom = {
            id: msg.id,
            user1ID: msg.user1ID,
            user2ID: msg.user2ID,
            user1username: msg.user1,
            user2username: msg.user2,
            channelName: msg.channelName,
            aliasName: msg.aliasName,
            currentRoomToggle: (this.currentRoom === msg.channelName)
          } 
          // console.log(this.currentUserIDfromDB, "   ", eachRoom.user1ID, "   ", eachRoom.user2ID)
          if(this.currentUserIDfromDB === eachRoom.user1ID || this.currentUserIDfromDB === eachRoom.user2ID){
            this.handleReceive(addDMRoom,eachRoom);
          }
        });
      });
    });
  } //end of downloadAllRooms

  render() {
    const sidebar = <RightSideBar theSocket={this.socket}/>;

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      shadow: true,
      pullRight: true,
      transitions: true,
      onSetOpen: this.onSetOpen,
    };

    return (


      <Sidebar {...sidebarProps} className='RightSideBar'>
              <TopNav />          

          <Grid id="Container">

            <Row>

            </Row>

            <Row>
              
              <Col className="LeftSideBar" md={3} lg={3}>
                <LeftSideBar downloadAllChannels={this.downloadAllChannels} theSocket={this.socket} />
              </Col>

              <Col className="PrimaryChatroom" md={9} lg={9}>
                <div 
                  onClick={this.toggleUserDock} >
                  <input type="checkbox" checked={this.state.docked} />
                  <label>Show Users</label>
                </div>
                <PrimaryChatroom theSocket={this.socket} />
              </Col>

            </Row>

          </Grid>    


      </Sidebar>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log("current room",state.allReducers.CurrentRoomReducer)
  return { 
    rooms: state.allReducers.RoomReducer,
    currentUser: state.allReducers.CurrentUserReducer,
    DMRooms: state.allReducers.DMRoomReducer,
    currentRoom: state.allReducers.CurrentRoomReducer
  }
};

export default connect(mapStateToProps)(AppContainer);






