import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { addDMRoom } from '../actions/DMRoomActions';

const RightSideBarEntryUser = ({ dispatch, DMRooms, user, allUsers, currentUser, theSocket }) => {

  const handleReceive = (cb,body) => {
    dispatch(cb(body));
  }

  return (
    <li onClick={ 
      () => {
        //for now, this will open up a DM request

        // console.log("clicked user",user)

        //emits to socket and has it alert to that user that I want to chat
        theSocket.emit("direct message",{
          recipientEmail: user.email,
          msg: user.username + ', ' + currentUser.username +" wants to open a direct chat with you!"
        });

        //set up a new direct message room
        axios.post('/db/DMRooms',{ user1: currentUser.id, user2: user.id })
        .then((response) => {
          console.log("room created in DB!", response);
          let roomToAdd = {
            id: response.data[0],
            user1ID: currentUser.id,
            user2ID: user.id,
            currentRoomToggle: true
          }
          handleReceive(addDMRoom,roomToAdd);
          console.log("these are my DM Rooms",DMRooms)
        })
        .catch((err) => console.error(err))

      }
    }>
      * { user.username }
    </li>

  );
}

const mapStateToProps = (state, ownProps) => {
  console.log("DM Rooms",state.allReducers.DMRoomReducer)
  return { 
    currentUser: state.allReducers.CurrentUserReducer,
    DMRooms: state.allReducers.DMRoomReducer,
    allUsers: state.allReducers.UserReducer 
  }
};

export default connect(mapStateToProps)(RightSideBarEntryUser);