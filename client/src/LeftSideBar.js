import axios from 'axios';
import React, { PropTypes } from 'react';
import LeftSideBarEntryChannel from './LeftSideBarEntry-Channel';
import { connect } from 'react-redux';

const LeftSideBar = ( {rooms, currentRoom, theSocket} ) => {
  let input;

  return (
    <div>

      <p>...</p>
      <p 
        onClick={ () => {console.log("this is my current room",currentRoom)}}>Console log my room
      </p>
      <p>...</p>

      <div>
        CHANNELS
        <ul id="rooms">
          {rooms.map(room =>
            <LeftSideBarEntryChannel theSocket={theSocket} key={room.id} room={room} />
          )}
        </ul>
      </div>
      <p>...</p>      


      <div>ADD A CHANNEL
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim()) { return; }
            //this is where you will issue a POST request to the database
            axios.post('/db/channels',{ name: input.value })
            .then((response) => console.log("room created in DB!", response))
            .catch((err) => console.error(err))
            //reinitialize the input field
            input.value = '';
          }}
        >
          <input ref={node => { input = node; }} />
          <button type="submit">Send</button>
        </form>
      </div>

      <p>...</p> 
      <div>
        DIRECT MESSAGES
      </div>
      <p>...</p> 

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