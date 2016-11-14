import React, { PropTypes } from 'react';
import SideBarEntryChannel from './SideBarEntry-Channel';
import { connect } from 'react-redux';

const SideBar = ( {rooms, currentRoom, theSocket} ) => {

  return (
    <div>

      <div>
        CHANNELS
        <ul id="rooms">
          {rooms.map(room =>
            <SideBarEntryChannel
              theSocket={theSocket}
              key={room.id}
              room={room}
            />
          )}
        </ul>
      </div>
      
      <p 
        onClick={ () => {console.log("this is my current room",currentRoom)}}>Console log my room
      </p>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return { 
    currentRoom: state.allReducers.CurrentRoomReducer,
    rooms: state.allReducers.RoomReducer 
  }
};

export default connect(mapStateToProps)(SideBar);