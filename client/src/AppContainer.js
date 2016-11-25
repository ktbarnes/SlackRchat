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


/*
Note to user: 
This file is the primary container for the application. 
What's rendered is four components:
  - TopNav, which is the nav bar for the application
  - LeftSideBar (which contains the list of all public channels, a user's subscribed channels, and user's DMs)
  - PrimaryChatroom, which is a separate component that houses the body of the chatroom (i.e. MessageList) 
    and the input form fields (i.e. ChatForm)
  - RightSideBar. Note that the sidebar is an npm module. The module required a parent component,
    in this case AppContainer. All of the components above were wrapped in the SideBar component rendered below
Props being passed in from the Redux store:
    rooms: state.allReducers.RoomReducer -- all available channels
    currentUser: state.allReducers.CurrentUserReducer -- the store's tracker for who the "current user" is
    DMRooms: state.allReducers.DMRoomReducer, -- all available direct message rooms
    currentRoom: state.allReducers.CurrentRoomReducer -- the store's tracker for which room the current user is currently in
*/


class AppContainer extends React.Component {

  constructor(props){
    super(props)
    this.currentUserIDfromDB;
    this.currentRoom = this.props.currentRoom.channelName;
    this.socket = io('/Hack-Reactor-NameSpace'); //instantiates namespace for socket
    this.state = {
      docked: false,
      open: false,
      transitions: true,
      shadow: true,
      pullRight: true
    } //state initialized for purpose of RightSideBar
    this.toggleUserDock = this.toggleUserDock.bind(this)
  }

  //Following set of functions used for RightSideBar
  onSetOpen(open) {this.setState({open: open})}
  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  } 
  toggleUserDock(ev){this.setState({ docked: !this.state.docked })}
  //End of RightSideBar functions

  //ComponentDidMount initializes the application for the user by downloading stored data from the database
  //First, it downloads all users, then all of the user's direct message rooms, then all of the public channels
  //It then initializes the socket.io receiver. This is where all the socket listeners are defined
  componentDidMount() {
    this.downloadInfo();

    /*
    Socket listener for incoming live chat messages
    Includes events for:
      - chat message (live incoming chat message within a channel/DM room)
      - disconnected (notification that a user has signed out of the application)
      - someoneJoin (notification that someone has joined the application)
      - direct message (live incoming direct message from another user)
      - connect (what socket should first do upon connect, which is to "changeRoom" to 
        current room and get a list of all "online" users from the socket)
      - online / offline toggle - tracks login and logout events for other users
    */

    this.socket.on('chat message', 
      incoming => {

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
          this.handleReceive(incrementUnreadMessageCounter,incoming.channelName)
        }
      }
    ); //end of this.socket.on('chat message')

    this.socket.on('disconnected', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    
    this.socket.on('someoneJoin', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    
    //This event may require some explanation...:
    this.socket.on("direct message", incoming => {
      window.alert(incoming.msg) //notification to user that another user is trying to send a direct message

      //following code is used because it needs to track whether current user has ever had a direct message with other user
      //if not you add that room to the DMRoomReducer. otherwise, you just go straight to that room
      this.roomExists = false;
      for (let i = 0; i<this.props.DMRooms.length; i++){
        if(incoming.room.id === this.props.DMRooms[i].id){ this.roomExists = true; }
      }

      //if that room does not exist, this is where the action is dispatched to the DMRoomReducer
      if(!this.roomExists){ this.handleReceive(addDMRoomFromSocket,incoming.room); }

      //In either case, must emit to socket a change of the room to the requested room from the oother user, and then
      //reset the store's current room to that room
      this.socket.emit('changeRoom', incoming.room.channelName)
      this.handleReceive(setCurrentRoom,incoming.room);
    }); //End of this.socket.on(direct message)
    
    this.socket.on('connect', (txt) => {
      this.socket.emit('changeRoom', this.props.currentRoom.channelName);
      this.socket.emit("getAllLoggedInUsersFromSocket")
    }); 
    
    this.socket.on('onlineToggle ON', email => {
      // console.log("who just logged in",email);
      this.handleReceive(toggleOnlineUser,email);
    });
    
    this.socket.on('onlineToggle OFF', email => {
      // console.log("who just logged off",email);
      this.handleReceive(toggleOfflineUser,email);
    });
    
    this.socket.on("getAllLoggedInUsersFromSocket", onlineUsersObj => {
      // console.log("TRYING TO GET A MESSAGE")
      // console.log("online users Obj",onlineUsersObj)
      // console.log("online users Obj keys",Object.keys(onlineUsersObj))
      if(Object.keys(onlineUsersObj).length > 0){
        Object.keys(onlineUsersObj).forEach( (email) =>
          this.handleReceive(downloadOnlineUsers,email)
        );
      }
    });
  }
  
  //Created this generic function that wraps a dispatch because I had been getting
  //an error at times when using dispatched actions within a promise. Was kind of a work-around
  //and used in several places
  handleReceive(cb,body) {
    this.props.dispatch(cb(body));
  }

  //download all info from the database, including "me", all channels, all users, all DM rooms
  downloadInfo(){
    axios.get('/db/getMe',
    { headers: { "authorization": "Bearer "+localStorage.getItem('id_token') }})
    .then( (res) => {
      this.currentUserIDfromDB = res.data.id;
      this.props.dispatch(setCurrentUser(res.data));
      this.downloadChannels();
      this.downloadAllUsers();
      this.downloadAllDMRooms();
    })
  }

  //gets "my" subscribed rooms from the channel_users join table by sending my ID
  //then downloading these rooms into the RoomReducer with "AmISubscribedToggle = true"
  //then downloads everything else from the channels database, and checks whether room was 
  //already downloaded. if so, skip, but if not, download as a public channel but mark as
  //not subscribed
  downloadChannels() {
    axios.post('/db/getMyChannels',{ myUserID: this.currentUserIDfromDB })
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
    })
    .then( () => {
      axios.get('/db/channels')
      .then( (res) => {
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
            if(room.channelName === msg.name){ isInRooms = true; }
          });
          if(!isInRooms){this.handleReceive(addRoom,eachRoom)}
          this.socket.emit('changeRoom', msg.name)
        });
        this.socket.emit('changeRoom', this.currentRoom)
      });
    }) 
  } //end of downloadChannels

  //downloads all users and sends into the UserReducer
  //here is where I also decided to tell the socket who I am, announced that I joined
  //the session, and get all my logged in users from the socket as an object
  //the toggle "onlineToggle" is then reset to true if there is a match from that object
  downloadAllUsers() {
    axios.get('/db/users')
    .then( (resp) => {
      resp.data.forEach( (person) => {
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
      });

      this.socket.emit("setMyEmailInSocket",{
        email: this.props.currentUser.email,
        username: this.props.currentUser.username
      });
      this.socket.emit("someoneJoin",this.props.currentUser.username);
      this.socket.emit("getAllLoggedInUsersFromSocket")
    });
  }

  downloadAllDMRooms(){
    axios.get('/db/DMRooms')
    .then( (res) => {
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
        if(this.currentUserIDfromDB === eachRoom.user1ID || this.currentUserIDfromDB === eachRoom.user2ID){
          this.handleReceive(addDMRoom,eachRoom);
        }
      });
    });
  } //end of downloadAllDMRooms

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
  return { 
    rooms: state.allReducers.RoomReducer,
    currentUser: state.allReducers.CurrentUserReducer,
    DMRooms: state.allReducers.DMRoomReducer,
    currentRoom: state.allReducers.CurrentRoomReducer
  }
};

export default connect(mapStateToProps)(AppContainer);


// OLD CODE
// import axios from 'axios';
// import React, { PropTypes } from 'react';
// import { dispatch, connect } from 'react-redux';
// import Sidebar from 'react-sidebar';
// import ReactDOM from 'react-dom';
// import TopNav from './nav.js';
// import PrimaryChatroom from './PrimaryChatroom.js';
// import LeftSideBar from './LeftSideBar.js';
// import RightSideBar from './RightSideBar.js';
// import { addMessageFromSocket, addMessageFromDB } from '../actions/ChatActions';
// import { addRoom, incrementUnreadMessageCounter } from '../actions/RoomActions';
// import { addDMRoom, addDMRoomFromSocket } from '../actions/DMRoomActions';
// import { addUser, toggleOnlineUser, toggleOfflineUser, downloadOnlineUsers } from '../actions/UserActions';
// import { setCurrentUser } from '../actions/CurrentUserActions';
// import { setCurrentRoom } from '../actions/CurrentRoomActions';
// import { default as Fade } from 'react-fade';
// import { Grid, Row, Col } from 'react-bootstrap';


// /*
// Note to user: 
// This file is the primary container for the application. 
// What's rendered is four components:
//   - TopNav, which is the nav bar for the application
//   - LeftSideBar (which contains the list of all public channels, a user's subscribed channels, and user's DMs)
//   - PrimaryChatroom, which is a separate component that houses the body of the chatroom (i.e. MessageList) 
//     and the input form fields (i.e. ChatForm)
//   - RightSideBar. Note that the sidebar is an npm module. The module required a parent component,
//     in this case AppContainer. All of the components above were wrapped in the SideBar component rendered below
// Props being passed in from the Redux store:
//     rooms: state.allReducers.RoomReducer -- all available channels
//     currentUser: state.allReducers.CurrentUserReducer -- the store's tracker for who the "current user" is
//     DMRooms: state.allReducers.DMRoomReducer, -- all available direct message rooms
//     currentRoom: state.allReducers.CurrentRoomReducer -- the store's tracker for which room the current user is currently in
// */


// class AppContainer extends React.Component {

//   constructor(props){
//     super(props)
//     this.currentUserIDfromDB;
//     this.currentRoom = this.props.currentRoom.channelName;
//     this.socket = io('/Hack-Reactor-NameSpace'); //instantiates namespace for socket
//     this.state = {
//       docked: false,
//       open: false,
//       transitions: true,
//       shadow: true,
//       pullRight: true
//     } //state initialized for purpose of RightSideBar
//     this.toggleUserDock = this.toggleUserDock.bind(this)
//   }

//   //Following set of functions used for RightSideBar
//   onSetOpen(open) {this.setState({open: open})}
//   menuButtonClick(ev) {
//     ev.preventDefault();
//     this.onSetOpen(!this.state.open);
//   } 
//   toggleUserDock(ev){this.setState({ docked: !this.state.docked })}
//   //End of RightSideBar functions

//   //ComponentDidMount initializes the application for the user by downloading stored data from the database
//   //First, it downloads all users, then all of the user's direct message rooms, then all of the public channels
//   //It then initializes the socket.io receiver. This is where all the socket listeners are defined
//   componentDidMount() {
//     this.downloadAllUsers(); //download all users on the application
//     this.downloadAllDMRooms(); //download all direct message rooms
//     this.downloadChannels(); //download all channels

//     /*
//     Socket listener for incoming live chat messages
//     Includes events for:
//       - chat message (live incoming chat message within a channel/DM room)
//       - disconnected (notification that a user has signed out of the application)
//       - someoneJoin (notification that someone has joined the application)
//       - direct message (live incoming direct message from another user)
//       - connect (what socket should first do upon connect, which is to "changeRoom" to 
//         current room and get a list of all "online" users from the socket)
//       - online / offline toggle - tracks login and logout events for other users
//     */

//     this.socket.on('chat message', 
//       incoming => {

//         //add message to ChatReducer
//         this.handleReceive(addMessageFromSocket,{
//           channelName: incoming.channelName,
//           channelID: incoming.channelID,
//           username: incoming.username,
//           text: incoming.text,
//           url: incoming.url,
//           picture: incoming.picture,
//         });

//         //increment unread messages only if user is not in that room
//         if(incoming.channelName !== this.props.currentRoom.channelName){
//           this.handleReceive(incrementUnreadMessageCounter,incoming.channelName)
//         }
//       }
//     ); //end of this.socket.on('chat message')

//     this.socket.on('disconnected', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    
//     this.socket.on('someoneJoin', txt => this.handleReceive(addMessageFromSocket,{text: txt}) );
    
//     //This event may require some explanation...:
//     this.socket.on("direct message", incoming => {
//       window.alert(incoming.msg) //notification to user that another user is trying to send a direct message

//       //following code is used because it needs to track whether current user has ever had a direct message with other user
//       //if not you add that room to the DMRoomReducer. otherwise, you just go straight to that room
//       this.roomExists = false;
//       for (let i = 0; i<this.props.DMRooms.length; i++){
//         if(incoming.room.id === this.props.DMRooms[i].id){ this.roomExists = true; }
//       }

//       //if that room does not exist, this is where the action is dispatched to the DMRoomReducer
//       if(!this.roomExists){ this.handleReceive(addDMRoomFromSocket,incoming.room); }

//       //In either case, must emit to socket a change of the room to the requested room from the oother user, and then
//       //reset the store's current room to that room
//       this.socket.emit('changeRoom', incoming.room.channelName)
//       this.handleReceive(setCurrentRoom,incoming.room);
//     }); //End of this.socket.on(direct message)
    
//     this.socket.on('connect', (txt) => {
//       this.socket.emit('changeRoom', this.props.currentRoom.channelName);
//       this.socket.emit("getAllLoggedInUsersFromSocket")
//     }); 
    
//     this.socket.on('onlineToggle ON', email => {
//       // console.log("who just logged in",email);
//       this.handleReceive(toggleOnlineUser,email);
//     });
    
//     this.socket.on('onlineToggle OFF', email => {
//       // console.log("who just logged off",email);
//       this.handleReceive(toggleOfflineUser,email);
//     });
    
//     this.socket.on("getAllLoggedInUsersFromSocket", onlineUsersObj => {
//       // console.log("TRYING TO GET A MESSAGE")
//       // console.log("online users Obj",onlineUsersObj)
//       // console.log("online users Obj keys",Object.keys(onlineUsersObj))
//       if(Object.keys(onlineUsersObj).length > 0){
//         Object.keys(onlineUsersObj).forEach( (email) =>
//           this.handleReceive(downloadOnlineUsers,email)
//         );
//       }
//     });
//   }
  
//   //Created this generic function that wraps a dispatch because I had been getting
//   //an error at times when using dispatched actions within a promise. Was kind of a work-around
//   //and used in several places
//   handleReceive(cb,body) {
//     this.props.dispatch(cb(body));
//   }

//   downloadInfo(){}

//   downloadChannels() {

//     this.currentUserIDfromDB;
//     axios.get('/db/getMe',
//     { headers: { "authorization": "Bearer "+localStorage.getItem('id_token') }})
//     .then( (res) => {
//       // console.log("who is my user???",res.data)
//       this.currentUserIDfromDB = res.data.id;
//       axios.post('/db/getMyChannels',{
//         myUserID: this.currentUserIDfromDB
//       })
//       .then( (res) => {
//         res.data.forEach( (msg) => {
//           let eachRoom = {
//             id: msg.channelIDinchannelDB,
//             channelName: msg.channelName,
//             currentRoomToggle: (this.currentRoom === msg.channelName),
//             AmISubscribedToggle: true
//           }
//           this.handleReceive(addRoom,eachRoom);
//           this.socket.emit('changeRoom', msg.channelName)
//           if(this.currentRoom === msg.channelName){
//             this.handleReceive(setCurrentRoom,eachRoom);
//           }
//         });
//       });
//     })
//     .then( () => {
//       axios.get('/db/channels')
//       .then( (res) => {
//         res.data.forEach( (msg) => {
//           let eachRoom = {
//             id: msg.id,
//             channelName: msg.name,
//             currentRoomToggle: false,
//             AmISubscribedToggle: false
//           }
//           if(this.currentRoom === msg.channelName){
//             this.handleReceive(setCurrentRoom,eachRoom);
//           }
//           //if channel does not exist in downloadMyChannelsOnly, 
//           //then add to reducer with toggle false
//           var isInRooms = false;
//           this.props.rooms.forEach( (room) => {
//             if(room.channelName === msg.name){ isInRooms = true; }
//           });
//           if(!isInRooms){this.handleReceive(addRoom,eachRoom)}
//           this.socket.emit('changeRoom', msg.name)
//         });
//         this.socket.emit('changeRoom', this.currentRoom)
//       });
//     }) 
//   } //end of downloadChannels

//   downloadAllUsers() {
//     this.currentUserIDfromDB;
//     axios.get('/db/getMe', { headers: { "authorization": "Bearer " + localStorage.getItem('id_token')}})
//     .then(res => {
//       this.props.dispatch(setCurrentUser(res.data));

//       //now download all users
//       axios.get('/db/users')
//       .then( (resp) => {
//         resp.data.forEach( (person) => {
//           let eachUser = {
//             id: person.id,
//             username: person.username,
//             email: person.email,
//             about: person.about,
//             first: person.first,
//             phone: person.phone,
//             last: person.last,
//             github: person.github,
//             facebook: person.facebook,
//             twitter: person.twitter,
//             linkedin: person.linkedin,
//             onlineToggle: false
//           }
//           this.handleReceive(addUser,eachUser);
//         });

//         this.socket.emit("setMyEmailInSocket",{
//           email: this.props.currentUser.email,
//           username: this.props.currentUser.username
//         });
//         this.socket.emit("someoneJoin",this.props.currentUser.username);
//         this.socket.emit("getAllLoggedInUsersFromSocket")
//       });
//     });
//   }

//   downloadAllDMRooms(){
//     //get from server who current user is
//     this.currentUserIDfromDB;
//     axios.get('/db/getMe',
//     { headers: { "authorization": "Bearer "+localStorage.getItem('id_token') }})
//     .then( (res) => {
//       this.currentUserIDfromDB = res.data.id;
//       axios.get('/db/DMRooms')
//       .then( (res) => {
//         res.data.forEach( (msg) => {
//           let eachRoom = {
//             id: msg.id,
//             user1ID: msg.user1ID,
//             user2ID: msg.user2ID,
//             user1username: msg.user1,
//             user2username: msg.user2,
//             channelName: msg.channelName,
//             aliasName: msg.aliasName,
//             currentRoomToggle: (this.currentRoom === msg.channelName)
//           } 
//           if(this.currentUserIDfromDB === eachRoom.user1ID || this.currentUserIDfromDB === eachRoom.user2ID){
//             this.handleReceive(addDMRoom,eachRoom);
//           }
//         });
//       });
//     });
//   } //end of downloadAllRooms

//   render() {
//     const sidebar = <RightSideBar theSocket={this.socket}/>;

//     const sidebarProps = {
//       sidebar: sidebar,
//       docked: this.state.docked,
//       sidebarClassName: 'custom-sidebar-class',
//       open: this.state.open,
//       shadow: true,
//       pullRight: true,
//       transitions: true,
//       onSetOpen: this.onSetOpen,
//     };

//     return (
//       <Sidebar {...sidebarProps} className='RightSideBar'>
//           <TopNav />          
//           <Grid id="Container">
//             <Row>
//               <Col className="LeftSideBar" md={3} lg={3}>
//                 <LeftSideBar downloadAllChannels={this.downloadAllChannels} theSocket={this.socket} />
//               </Col>
//               <Col className="PrimaryChatroom" md={9} lg={9}>
//                 <div 
//                   onClick={this.toggleUserDock} >
//                   <input type="checkbox" checked={this.state.docked} />
//                   <label>Show Users</label>
//                 </div>
//                 <PrimaryChatroom theSocket={this.socket} />
//               </Col>
//             </Row>
//           </Grid>    
//       </Sidebar>
//     );
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   return { 
//     rooms: state.allReducers.RoomReducer,
//     currentUser: state.allReducers.CurrentUserReducer,
//     DMRooms: state.allReducers.DMRoomReducer,
//     currentRoom: state.allReducers.CurrentRoomReducer
//   }
// };

// export default connect(mapStateToProps)(AppContainer);