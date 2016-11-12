import React, { PropTypes } from 'react';
import SideBarEntryChannel from './SideBarEntry-Channel';
import { connect } from 'react-redux';

const SideBar = ( {rooms} ) => {

  return (
    <div>
      <div>
        CHANNELS
        <ul id="rooms">
          {rooms.map(room =>
            <SideBarEntryChannel
              key={room.id}
              room={room.channelName}
            />
          )}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return { rooms: state.allReducers.RoomReducer }
};

export default connect(mapStateToProps)(SideBar);