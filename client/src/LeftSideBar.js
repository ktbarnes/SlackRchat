import axios from 'axios';
import React, { PropTypes } from 'react';
import LeftSideBarEntryChannel from './LeftSideBarEntry-Channel';
import { dispatch, connect } from 'react-redux';
import { addRoom, toggleSubscribeRoomOn } from '../actions/RoomActions';
import { toggleOnlineUser } from '../actions/UserActions';
import { setCurrentRoom } from '../actions/CurrentRoomActions';
import Dropdown from 'react-dropdown';

//stateful
//= ( {rooms, DMRooms, allUsers, currentRoom, currentUser, dispatch, theSocket} ) => 
class LeftSideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectValue: 'Lobby',
      options: []//this.props.rooms.map(room => room.channelName)
    }
    // this.options = this.props.rooms.map(room => room.channelName);
    // this.options = ["Lobby","Second Room","Third Room","Fourth Room"]

  }

  handleReceive(cb,body) {
    dispatch(cb(body))
  }

  onSelect(updatedValue) { //updatedValue = channelName only
    this.setState({selectValue: updatedValue.value});

    //iterate through the rooms in the store to find a matching room name
    this.props.rooms.forEach( (room) => {
      //if a match, perform some functions
      if(room.channelName === updatedValue.value){
        //if I'm not subscribed to the room, subscribe to it and have that persist in the DB
        if(!room.AmISubscribedToggle){
          //turn the toggle true so that users now "subscribe to the channel"
          this.props.dispatch(toggleSubscribeRoomOn(updatedValue.value))
          //"persist" in database
          axios.post('/db/addMyChannel',{
            myUserID: this.props.currentUser.id,
            channelID: room.id
          })
        }
        //now go to that room
        this.props.dispatch(setCurrentRoom(room))
      }
    })
  }

  componentWillMount() {
    this.input;
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.rooms.length !== nextProps.rooms.length) {
      this.setState({options: nextProps.rooms.map(room => room.channelName)}); 
    }
  }

  render() {
    // console.log('rerendering...here is new state ', this.state)
    // console.log('I want to know information about the currentUser room subscription ', this.props.rooms)
    return (
      <div> 

        <div className='dropdown-leftsidebar'>
          All Channels
          <Dropdown 
            options={this.state.options} 
            onChange={(value)=>this.onSelect(value)} 
            value={this.state.selectValue} 
            placeholder='Select an option...'
          />
        </div>
        
        <p>...</p>   

        <div>
          My Channels
          <ul id="rooms">
            {this.props.rooms.filter( room => room.AmISubscribedToggle).map(room =>
              <LeftSideBarEntryChannel theSocket={this.props.theSocket} key={room.id} room={room} />
            )}
          </ul>
        </div>
        <p>...</p>      


        <div>Add a Channel
          <form
            onSubmit={e => {
              const thisInput = this.input.value; //have to do this bc of async issues
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
                this.handleReceive(addRoom,roomToAdd);
                axios.post('/db/addMyChannel',{
                  myUserID: this.props.currentUser.id,
                  channelID: response.data[0]
                })
              })
              .catch((err) => console.error(err))

              //reinitialize the input field
              this.input.value = '';
              
            }}
          >
            <input ref={node => { this.input = node; }} />
            <button type="submit">Send</button>
          </form>
        </div>

        <p>...</p> 
        <div>
          Direct Messages
          <ul id="rooms">
            {this.props.DMRooms.map(room =>
              <LeftSideBarEntryChannel theSocket={this.props.theSocket} key={room.id} room={room} />
            )}
          </ul>
        </div>
        <p>...</p>  

        <p>...</p>
        <p 
          onClick={ () => {
            console.log("this is my current room",this.props.currentRoom);
            console.log("this is my current user",this.props.currentUser);
            console.log("these are my DM Rooms",this.props.DMRooms)
            console.log("this is all the users after",this.props.allUsers);
            console.log("all available rooms",this.props.rooms)
          }}>ConsoleLog me!
        </p>
        <p>...</p>  

      </div>
    )

  }


}


        // <div>
        //   ALL CH - WILL BE DROPDOWN
        //   <ul id="rooms">
        //     {this.props.rooms.map(room =>
        //       <LeftSideBarEntryChannel theSocket={this.props.theSocket} key={room.id} room={room} />
              
        //     )}
        //   </ul>
        // </div>

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