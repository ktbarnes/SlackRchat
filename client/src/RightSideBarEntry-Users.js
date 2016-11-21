import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { addDMRoom } from '../actions/DMRoomActions';
import { setCurrentRoom } from '../actions/CurrentRoomActions';
import { Router, Route, Link, browserHistory } from 'react-router';
import {OtherUserProfile} from './OtherUserProfile'
import { clickedUserProfile, open, close} from '../actions/ClickedUserProfileActions';
// import {OtherUserProfile} from './src/OtherUserProfile'
const RightSideBarEntryUser = ({ dispatch, DMRooms, user, allUsers, currentUser, currentRoom, theSocket, clickedUser }) => {
  
  const handleReceive = (cb,body) => {
    dispatch(cb(body));
  }

  const openProfile= () => {
      dispatch(open())
  }
  const handleProfile = (cb, user) => {
    let id = user.id
    dispatch(cb(user));
    // console.log(this.props.clickedUser, "these are them")
    openProfile()
    // this.props.dispatch(open())
  } 

  const getPeerToChangeRoom = (room) => {
    //emits to socket and has it alert to that user that I want to chat
    console.log("the socket RightSideBarEntryUsers",theSocket)
    console.log("user.username in RightSideBar",user.username)
    console.log("room in RightSideBar",room)
    theSocket.emit("direct message",{
      recipientUsername: user.username,
      room: room,
      msg: user.username + ', ' + currentUser.username +" wants to open a direct chat with you!"
    });
  }

  return (
    <div>
      <li style={{color: (user.onlineToggle) ? 'green' : 'black' }}>
        {user.username} {(user.onlineToggle) ? 'ONLINE' : 'offline'}
        <button onClick={() => handleProfile(clickedUserProfile, user)}>
        Profile</button>

        <button  onClick={ 
          () => {
            //for now, this will open up a DM request

            console.log("the Socket onClick RightSideBarEntryUsers",theSocket)

            // //emits to socket and has it alert to that user that I want to chat
            // theSocket.emit("direct message",{
            //   recipientEmail: user.email,
            //   // room: currentRoom.channelName,
            //   msg: user.username + ', ' + currentUser.username +" wants to open a direct chat with you!"
            // });

            //if DM room exists i.e. in the DB, set currentRoom to room with that person
            let roomExists = false;
            for(let i = 0; i<DMRooms.length; i++){
              // console.log("user.username",user.username)
              // console.log("DMRooms[i].user1name",DMRooms[i].user1username)
              // console.log("DMRooms[i].user2name",DMRooms[i].user2username)
              if(user.username === DMRooms[i].user1username || user.username === DMRooms[i].user2username){
                handleReceive(setCurrentRoom,DMRooms[i]);
                theSocket.emit('changeRoom', currentRoom);
                getPeerToChangeRoom(DMRooms[i]);
                roomExists = true;
                return;
              }
            }
            //otherwise make a new room
            if(!roomExists){
                //set up a new direct message room
                axios.post('/db/DMRooms',{ 
                  user1: currentUser.id, 
                  user2: user.id,
                  channelName: currentUser.username + user.username, //i.e. CanhJulia
                  aliasName: user.username + currentUser.username }) //i.e. JuliaCanh
                .then((response) => {
                  console.log("room created in DB!", response);
                  let roomToAdd = {
                    id: response.data[0],
                    user1ID: currentUser.id,
                    user2ID: user.id,
                    user1username: currentUser.username,
                    user2username: user.username,
                    channelName: currentUser.username + user.username,
                    aliasName: user.username + currentUser.username,
                    currentRoomToggle: true
                  }
                  //add room to Store
                  handleReceive(addDMRoom,roomToAdd);

                  //change current room in Store and in the Socket
                  handleReceive(setCurrentRoom,roomToAdd);
                  theSocket.emit('changeRoom', currentRoom.channelName);
                  // getPeerToChangeRoom();
                })
                .then( () => getPeerToChangeRoom(currentRoom))
                .catch((err) => console.error(err))          
            }

          }
        }>DM</button>

        <div>
          
        </div>
      </li>  
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  // console.log("DMRooms",state.allReducers.ClickedUserProfileReducer)
  return { 
    currentUser: state.allReducers.CurrentUserReducer,
    currentRoom: state.allReducers.CurrentRoomReducer,
    DMRooms: state.allReducers.DMRoomReducer,
    allUsers: state.allReducers.UserReducer,
    clickedUser: state.allReducers.ClickedUserProfileReducer
  }
};

export default connect(mapStateToProps)(RightSideBarEntryUser);