import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { setCurrentRoom } from '../actions/CurrentRoomActions';
import { toggleCurrentRoomField } from '../actions/RoomActions';

//room is passed in as a prop from sidebar.js
const LeftSideBarEntryChannel = ({ dispatch, room, currentUser, currentRoom, theSocket }) => (
  <li 
    style={
      {backgroundColor: (currentRoom.channelName === room.channelName) ? "orange" : "white"}
    }
    onClick={ () => {
      dispatch(setCurrentRoom(room));
      theSocket.emit('changeRoom', currentRoom)
    }
  }>
    * { (room.aliasName === "Channel_NotDM") ? room.channelName : 
        ((currentUser === room.user1username) ? room.user2username : room.user1username)
      }
  </li>

);

// Message.propTypes = {
//   message.text: PropTypes.string.isRequired,
// };

const mapStateToProps = (state, ownProps) => {
  // console.log("all rooms",state.allReducers.RoomReducer)
  return { 
    currentRoom: state.allReducers.CurrentRoomReducer,
    currentUser: state.allReducers.CurrentUserReducer.username,
    rooms: state.allReducers.RoomReducer
  }
};

export default connect(mapStateToProps)(LeftSideBarEntryChannel);