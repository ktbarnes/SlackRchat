import axios from 'axios';
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import { setCurrentRoom } from '../actions/CurrentRoomActions';
import { toggleCurrentRoomField, toggleSubscribeRoomOff } from '../actions/RoomActions';
import { Badge, Button } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

//Note to reader: this is the component for each rendered room in the left sidebar for
//My Channels and Direct Messages

const LeftSideBarEntryChannel = ({ dispatch, room, currentUser, currentRoom, theSocket }) => {

  const handleReceive = (cb,body) => dispatch(cb(body));

  return (
    <NavItem className="myChannelButtonHider"
      style={
        {backgroundColor: (currentRoom.channelName === room.channelName) ? "#ADD8E6" : "white"}
      }

      onClick={ () => {
        room.unreadMessageCounter = 0;
        dispatch(setCurrentRoom(room));
        theSocket.emit('changeRoom', currentRoom.channelName)
      }}
    >
      { (room.aliasName === "Channel_NotDM") ? room.channelName : 
          ((currentUser.username === room.user1username) ? room.user2username : room.user1username)
      }

        <Badge>
          { room.unreadMessageCounter > 0 &&
          room.unreadMessageCounter
          }
        </Badge>

      {room.AmISubscribedToggle && room.channelName !== "Lobby" && 
        <Button bsSize="xsmall" className="myChannelButtons viewThisButton"
          onClick={ () => { //this button removes user's subscription to a certain channel
            //persists this fact in the database
            axios.post('/db/deleteMyChannel',{
              myUserID: currentUser.id,
              channelID: room.id
            })
            .then( () => window.alert("You have left ",room.channelName))

            //switches the subscribed toggle in the RoomReducer from on to off
            handleReceive(toggleSubscribeRoomOff,room)
          }}>
          x
        </Button>
      }
    </NavItem>

  )
}

const mapStateToProps = (state, ownProps) => {
  return { 
    currentRoom: state.allReducers.CurrentRoomReducer,
    currentUser: state.allReducers.CurrentUserReducer,
    rooms: state.allReducers.RoomReducer
  }
};

export default connect(mapStateToProps)(LeftSideBarEntryChannel);