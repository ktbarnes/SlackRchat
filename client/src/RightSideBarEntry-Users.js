import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { addDMRoom } from '../actions/DMRoomActions';
import { setCurrentRoom } from '../actions/CurrentRoomActions';
import { Router, Route, Link, browserHistory } from 'react-router';
import OtherUserProfile from './OtherUserProfile'
import { clickedUserProfile, open2, close2} from '../actions/ClickedUserProfileActions';
import { Button } from 'react-bootstrap';

// import {OtherUserProfile} from './src/OtherUserProfile'
const RightSideBarEntryUser = ({ dispatch, DMRooms, user, allUsers, currentUser, currentRoom, theSocket, clickedUser }) => {
  
  const handleReceive = (cb,body) => {
    dispatch(cb(body));
  }

  const openProfile= () => {
      dispatch(open2())
  }
  const handleProfile = (cb, user) => {
    let id = user.id
    // console.log(id, 'this is the clicked user id')
    dispatch(cb(user));
    // console.log(this.props.clickedUser, "these are them")
    // dispatch(open2())
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
        <Button onClick={() => 
          axios.post('db/getOther', {id: user.id})
             .then((response)=> {
              console.log('this is the new resposne', response)
              let user = {
                id: response.data[0].id,
                email: response.data[0].email, 
                picture: response.data[0].picture, 
                first: response.data[0].first,
                about: response.data[0].about,
                first: response.data[0].first,
                last: response.data[0].last,
                github: response.data[0].github,
                facebook: response.data[0].facebook,
                twitter: response.data[0].twitter,
                linkedin: response.data[0].linkedin,
                phone: response.data[0].phone
                // showModel: response.data[0]
              }
              handleProfile(clickedUserProfile, user)
          }) 
        }>

        Profile</Button>

        <Button  onClick={ 
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
        }>DM</Button>
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