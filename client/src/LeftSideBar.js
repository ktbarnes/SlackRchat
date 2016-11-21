import axios from 'axios';
import React, { PropTypes } from 'react';
import LeftSideBarEntryChannel from './LeftSideBarEntry-Channel';
import { dispatch, connect } from 'react-redux';
import { addRoom } from '../actions/RoomActions';
import { toggleOnlineUser } from '../actions/UserActions';

const LeftSideBar = ( {rooms, DMRooms, allUsers, currentRoom, currentUser, dispatch, theSocket} ) => {
  var input;

  const handleReceive = (cb,body) => dispatch(cb(body));

  const myRooms = rooms.filter( room => room.AmISubscribedToggle);

  return (
    <div>

      <p>...</p>
      <p 
        onClick={ () => {
          console.log("this is my current room",currentRoom);
          console.log("this is my current user",currentUser);
          console.log("these are my DM Rooms",DMRooms)
          console.log("this is all the users after",allUsers);
          console.log("all available rooms",rooms)
        }}>ConsoleLog me!
      </p>
      <p>...</p>   
      
      <div>
        ALL CH - WILL BE DROPDOWN
        <ul id="rooms">
          {rooms.map(room =>
            <LeftSideBarEntryChannel theSocket={theSocket} key={room.id} room={room} />
            
          )}
        </ul>
      </div>
      <p>...</p>   

      <div>
        MY SUBSCRIBED CHANNELS
        <ul id="rooms">
          {myRooms.map(room =>
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
                currentRoomToggle: false,
                AmISubscribedToggle: true
              }
              // console.log("this is the room I added",roomToAdd)
              handleReceive(addRoom,roomToAdd);
              axios.post('/db/addMyChannel',{
                myUserID: currentUser.id,
                channelID: response.data[0]
              })
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
        <ul id="rooms">
          {DMRooms.map(room =>
            <LeftSideBarEntryChannel theSocket={theSocket} key={room.id} room={room} />
          )}
        </ul>
      </div>
      <p>...</p>  

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  // console.log("all users",state.allReducers.UserReducer)
  return { 
    allUsers: state.allReducers.UserReducer,
    currentRoom: state.allReducers.CurrentRoomReducer,
    DMRooms: state.allReducers.DMRoomReducer,
    currentUser: state.allReducers.CurrentUserReducer,
    rooms: state.allReducers.RoomReducer 
  }
};

export default connect(mapStateToProps)(LeftSideBar);