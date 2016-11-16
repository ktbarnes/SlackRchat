import axios from 'axios';
import React, { PropTypes } from 'react';
import LeftSideBarEntryChannel from './LeftSideBarEntry-Channel';
import { dispatch, connect } from 'react-redux';
import { addRoom } from '../actions/RoomActions';

const LeftSideBar = ( {rooms, currentRoom, currentUser, dispatch, theSocket} ) => {
  var input;

  const handleReceive = (cb,body) => {
    dispatch(cb(body));
  }

  return (
    <div>

      <p>...AppContainer</p>
      <p 
        onClick={ () => {
          console.log("this is my current room",currentRoom);
          console.log("this is my current user",currentUser);
        }}>CL my room
      </p>
      <p>...AppContainer</p>

      <p>...</p>
      <p 
        onClick={ () => {
          // theSocket.emit("setMyEmailInSocket",{email: currentUser[0].email});
        }}>TestDMSocketButton
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
            const thisInput = input.value; //have to do this bc of async issues
            e.preventDefault();
            if (!thisInput.trim()) { return; }
            //this is where you will issue a POST request to the database
            axios.post('/db/channels',{ name: thisInput })
            .then((response) => {
              // console.log("room created in DB!", response);
              let roomToAdd = {
                id: response.data[0],
                channelName: thisInput,
                currentRoomToggle: false
              }
              // console.log("this is the room I added",roomToAdd)
              handleReceive(addRoom,roomToAdd);
            })
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
    currentUser: state.allReducers.CurrentUserReducer,
    rooms: state.allReducers.RoomReducer 
  }
};

export default connect(mapStateToProps)(LeftSideBar);