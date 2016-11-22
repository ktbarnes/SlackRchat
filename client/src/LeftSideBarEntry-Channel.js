import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { setCurrentRoom } from '../actions/CurrentRoomActions';
import { toggleCurrentRoomField, toggleSubscribeRoomOff } from '../actions/RoomActions';

//room is passed in as a prop from sidebar.js
const LeftSideBarEntryChannel = ({ dispatch, room, currentUser, currentRoom, theSocket }) => {

  const handleReceive = (cb,body) => dispatch(cb(body));

  return (
    <li style={
        {backgroundColor: (currentRoom.channelName === room.channelName) ? "orange" : "white"}
      }

      onClick={ () => {
        room.unreadMessageCounter = 0;
        dispatch(setCurrentRoom(room));
        theSocket.emit('changeRoom', currentRoom.channelName)
      }
    }>
      { (room.aliasName === "Channel_NotDM") ? room.channelName : 
          ((currentUser.username === room.user1username) ? room.user2username : room.user1username)
        }

        { room.unreadMessageCounter > 0 &&
        " - " + room.unreadMessageCounter
        }

      {room.AmISubscribedToggle && room.channelName !== "Lobby" && 
        <button onClick={ () => {
          axios.post('/db/deleteMyChannel',{
            myUserID: currentUser.id,
            channelID: room.id
          })
          .then( () => window.alert("You have left ",room.channelName))

          handleReceive(toggleSubscribeRoomOff,room)
        }}>
          x
        </button>
      }
    </li>

  )
}

// Message.propTypes = {
//   message.text: PropTypes.string.isRequired,
// };

const mapStateToProps = (state, ownProps) => {
  // console.log("all rooms",state.allReducers.RoomReducer)
  return { 
    currentRoom: state.allReducers.CurrentRoomReducer,
    currentUser: state.allReducers.CurrentUserReducer,
    rooms: state.allReducers.RoomReducer
  }
};

export default connect(mapStateToProps)(LeftSideBarEntryChannel);