import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
// import { toggleCurrentRoomField } from '../actions/RoomActions'; //commented out for now. this will be used for something like toggling "selected" users in the sidebar

//room is passed in as a prop from sidebar.js
const RightSideBarEntryUser = ({ dispatch, user, allUsers, currentUser, theSocket }) => (
  <li onClick={ 
    () => {
    }
  }>
    * { user.username }
  </li>

);

// Message.propTypes = {
//   message.text: PropTypes.string.isRequired,
// };

const mapStateToProps = (state, ownProps) => {
  // console.log("all rooms",state.allReducers.RoomReducer)
  return { 
    currentUser: state.allReducers.CurrentUserReducer,
    allUsers: state.allReducers.UserReducer 
  }
};

export default connect(mapStateToProps)(RightSideBarEntryUser);