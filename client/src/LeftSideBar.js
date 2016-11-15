import React, { PropTypes } from 'react';
import LeftSideBarEntryChannel from './LeftSideBarEntry-Channel';
import { connect } from 'react-redux';

const LeftSideBar = ( {rooms, currentRoom, theSocket} ) => {

  return (
    <div>

      <div>
        CHANNELS
        <ul id="rooms">
          {rooms.map(room =>
            <LeftSideBarEntryChannel
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

export default connect(mapStateToProps)(LeftSideBar);