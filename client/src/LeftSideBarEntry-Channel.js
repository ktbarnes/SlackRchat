import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { setCurrentRoom } from '../actions/CurrentRoomActions';
import { toggleCurrentRoomField, toggleSubscribeRoomOff } from '../actions/RoomActions';
import { Badge, Button } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

//room is passed in as a prop from sidebar.js
const LeftSideBarEntryChannel = ({ dispatch, room, currentUser, currentRoom, theSocket }) => {

  const handleReceive = (cb,body) => dispatch(cb(body));

  return (
    <NavItem style={
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

        <Badge>
          { room.unreadMessageCounter > 0 &&
          room.unreadMessageCounter
          }
        </Badge>

      {room.AmISubscribedToggle && room.channelName !== "Lobby" && 
        <Button bsSize="xsmall"
          onClick={ () => {
            axios.post('/db/deleteMyChannel',{
              myUserID: currentUser.id,
              channelID: room.id
            })
            .then( () => window.alert("You have left ",room.channelName))

            handleReceive(toggleSubscribeRoomOff,room)
          }}>
          x
        </Button>
      }
    </NavItem>

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