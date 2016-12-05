import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { addDMRoom } from '../actions/DMRoomActions';
import { setCurrentRoom } from '../actions/CurrentRoomActions';
import { Router, Route, Link, browserHistory } from 'react-router';
import OtherUserProfile from './OtherUserProfile'
import { clickedUserProfile, open2, close2} from '../actions/ClickedUserProfileActions';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

/*
Note to reader:
This is the component for each user that is going to be listed in the right sliding sidebar of the application. 

It also is the parent component for profiles that will render as modals once the link to the Profile is clicked. 

For each user, there are three functions:
1 - a toggle to determine whether or not the user is listed as being online. This is determined by looking at the
onlineToggle property of the user and conditionally rendering from there

The first button for the profile pings the database to ensure the profile info being viewed is the latest that has
been perissted to the database

The second button activates a direct message with another user. First, it determines whether it should create a 
new direct message room or simply go to the direct message room already created. Direct Message rooms are generally named as
either user1user2 or user2user1 (i.e. CanhJulia or JuliaCanh), and only one of them is persisted in the database. 

After that check happens, an event is emitted to the socket using the "direct message" listener that makes the other user
go directly to the room instance, through calling the getPeerToChangeRoom functin. 
*/

const RightSideBarEntryUser = ({ dispatch, DMRooms, user, allUsers, currentUser, currentRoom, theSocket, clickedUser }) => {
  
  const handleReceive = (cb,body) => { dispatch(cb(body)); }

  const openProfile= () => { dispatch(open2()) }

  const handleProfile = (cb, user) => {
    let id = user.id
    dispatch(cb(user));
    openProfile()
  } 

  const getPeerToChangeRoom = (room) => {
    //emits to socket and has it alert to that user that I want to chat
    theSocket.emit("direct message",{
      recipientUsername: user.username,
      room: room,
      msg: user.username + ', ' + currentUser.username +" wants to open a direct chat with you!"
    });
  }

  return (
    <div className="RSBUsers">
      <li className="RSBEachUser"> 
        <div style={{
          color: (user.onlineToggle) ? 'green' : 'black',
          fontWeight: (user.onlineToggle) ? 'bolder' : '100'
        }}>
          {user.username} {(user.onlineToggle) ? 'ONLINE' : 'offline'}
        </div>

        <ButtonToolbar>
          <ButtonGroup bsSize="xsmall">
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
                  }
                  handleProfile(clickedUserProfile, user)
              }) 
            }>

            Profile</Button>

            <Button onClick={ 
              () => {

                //if DM room exists i.e. in the DB, set currentRoom to room with that person
                let roomExists = false;
                for(let i = 0; i<DMRooms.length; i++){
                  if(user.username === DMRooms[i].user1username || user.username === DMRooms[i].user2username){
                    handleReceive(setCurrentRoom,DMRooms[i]);
                    console.log("RSBEU - moving to: ",DMRooms[i].channelName)
                    theSocket.emit('changeRoom', DMRooms[i].channelName); 
                    getPeerToChangeRoom(DMRooms[i]);
                    roomExists = true;
                    theSocket.emit('changeRoom', DMRooms[i].channelName); 
                    return;
                  }
                }
                //otherwise make a new room
                if(!roomExists){
                    //set up a new direct message room
                    let roomToAdd;
                    axios.post('/db/DMRooms',{ 
                      user1: currentUser.id, 
                      user2: user.id,
                      channelName: currentUser.username + user.username, //i.e. CanhJulia
                      aliasName: user.username + currentUser.username }) //i.e. JuliaCanh
                    .then((response) => {
                      console.log("room created in DB!", response);
                      roomToAdd = {
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
                      theSocket.emit('changeRoom', roomToAdd.channelName);
                    })
                    .then( () => getPeerToChangeRoom(roomToAdd))
                    .catch((err) => console.error(err))          
                }
              }
            }>DM</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <div>
        </div>
      </li>  
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return { 
    currentUser: state.allReducers.CurrentUserReducer,
    currentRoom: state.allReducers.CurrentRoomReducer,
    DMRooms: state.allReducers.DMRoomReducer,
    allUsers: state.allReducers.UserReducer,
    clickedUser: state.allReducers.ClickedUserProfileReducer
  }
};

export default connect(mapStateToProps)(RightSideBarEntryUser);