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
              room={room.room}
            />
          )}
        </ul>
      </div>
    </div>
  )
}

// MessageList.propTypes = {
//   dataStore: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     text: PropTypes.string.isRequired,
//   }).isRequired).isRequired,
// };

const mapStateToProps = (state, ownProps) => {
  console.log("what are my rooms", state.allReducers.RoomReducer);
  return { rooms: state.allReducers.RoomReducer }
};

export default connect(mapStateToProps)(SideBar);