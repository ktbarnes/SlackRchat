import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { addDMRoom } from '../actions/DMRoomActions';
import { Router, Route, Link, browserHistory } from 'react-router';
import {OtherUserProfile} from './OtherUserProfile'
import { clickedUserProfile } from '../actions/ClickedUserProfileActions';

const RightSideBarEntryUser = ({ dispatch, DMRooms, user, allUsers, currentUser, theSocket }) => {
  
  
  const handleReceive = (cb,body) => {
    dispatch(cb(body));
  }
  // console.log(user, 'clicked user')

  const handleProfile = (cb, user) => {
    let id = user.id
    // matchUser(id)
    dispatch(cb(user));
    console.log(user, "this is the user I clicked")
  } 

  return (
    <div>
      <li>{user.username}
        <button onClick={() => handleProfile(clickedUserProfile, user)}>
        <Link to='/profile'>Profile</Link></button>
        <button  












        >Direct Message</button>
      </li>  
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  console.log("UserReducer",state.allReducers.UserReducer)
  return { 
    currentUser: state.allReducers.CurrentUserReducer,
    // DMRooms: state.allReducers.DMRoomReducer,
    allUsers: state.allReducers.UserReducer,
    clickedUser: state.allReducers.ClickedUserProfileReducer
  }
};

export default connect(mapStateToProps)(RightSideBarEntryUser);