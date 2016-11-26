import axios from 'axios';
import React, { PropTypes } from 'react';
import LeftSideBarEntryChannel from './LeftSideBarEntry-Channel';
import { dispatch, connect } from 'react-redux';
import { addRoom, toggleSubscribeRoomOn } from '../actions/RoomActions';
import { toggleOnlineUser } from '../actions/UserActions';
import { setCurrentRoom } from '../actions/CurrentRoomActions';
import Dropdown from 'react-dropdown';
import { Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router';

/*
Note to reader: This is the left side bar of our app, which houses the list of public channels,
a user's subscribed channels, as well as the user's persisted direct message rooms

Separate note: the socket is being passed in as a hard prop from AppContainer

The rendered info for My Channels and Direct Messages are instances of the LeftSideBarEntryChannel
component
*/

class LeftSideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectValue: 'Select an option...',
      options: [],
    }
    this.showNewChannelForm = false;
  }

  handleReceive(cb,body) { dispatch(cb(body))}

  //This may require some explanation
  //the forEach function iterates through public channels to determine whether selected
  //room from the dropdown is a subscribed room. if not, user will subscribe to it in
  //the store and then have that fact persisted to the database via the /db/addMyChannel endpoint
  //then the person is then redirected to that room by the setCurrentRoom dispatch
  onSelect(updatedValue) { //updatedValue = channelName only
    this.setState({selectValue: updatedValue.value});

    if(updatedValue.value === "Add A New Channel..."){ 
      this.showNewChannelForm = true; 
      return;
    }

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

    updatedValue.value = "Select an option..."
  }

  analytics() {
    console.log('inside this.analytics ')
    this.props.router.replace('/analytics')
  }
  //updates this.props.rooms into the component's state as used by the dropdown 
  //once info is downloaded from the database
  componentWillReceiveProps(nextProps) {
    if(this.props.rooms.length !== nextProps.rooms.length) {
      let myOptions = nextProps.rooms.map(room => room.channelName);
      myOptions = myOptions.concat("Add A New Channel...")
      this.setState({options: myOptions}); 
    }
  }

  render() {
    // console.log('WHAT IS THE STATE ', this.state)
    // console.log('WHAT IS THE CURRENT USER ', this.props.currentUser)
    return (
      <div> 

        <div className='dropdown-leftsidebar'>
          <h4>All Channels</h4>
          <Dropdown 
            options={this.state.options} 
            onChange={(value)=>this.onSelect(value)} 
            value={this.state.selectValue} 
            placeholder='Select an option...'
          />
        </div>

        <div>
        { this.showNewChannelForm &&
          <form
            onSubmit={e => {
              const thisInput = this.input.value; //have to do this bc of async issues
              e.preventDefault();
              if (!thisInput.trim()) { return; }
              //this is where you will issue a POST request to the database
              axios.post('/db/channels',{ name: thisInput })
              .then((response) => {
                let roomToAdd = {
                  id: response.data[0],
                  channelName: thisInput,
                  currentRoomToggle: false,
                  AmISubscribedToggle: true
                }
                this.props.dispatch(addRoom(roomToAdd)); //adds room to RoomReducer
                axios.post('/db/addMyChannel',{ //posts new room to the database
                  myUserID: this.props.currentUser.id,
                  channelID: response.data[0]
                })
              })
              .catch((err) => console.error(err))

              //reinitialize the input field
              this.input.value = '';
              this.showNewChannelForm = false; //hides the new channel form
              
            }}
          >
            <input ref={node => { this.input = node; }} />
            <Button bsSize="xsmall">Send</Button>
          </form>
        }
        </div>
        <div>...</div>
        <div className="MyChannelHeaders">
          <h4>My Channels</h4>
          <Nav bsStyle="pills" stacked activeKey={1}>
            {this.props.rooms.filter( room => room.AmISubscribedToggle).map((room,i) =>
              <LeftSideBarEntryChannel theSocket={this.props.theSocket} key={room.id}room={room} />
            )}
          </Nav>
        </div>    
        <div>...</div>
        <div className="DMChannelHeaders">
          <h4>Direct Messages</h4>
          <Nav bsStyle="pills" stacked activeKey={1}>
            {this.props.DMRooms.map(room =>
              <LeftSideBarEntryChannel theSocket={this.props.theSocket} key={room.id} room={room} />
            )}
          </Nav>
        </div>

        <div>...</div>


        {
          !!this.props.currentUser.admin &&
          <Link to='/analytics'>Administrator</Link>
        }

        <p 
          onClick={ () => { //Note: this was here for developer reference only!!! do not use
            console.log("this is my current room",this.props.currentRoom);
            console.log("this is my current user",this.props.currentUser);
            console.log("these are my DM Rooms",this.props.DMRooms)
            console.log("this is all the users after",this.props.allUsers);
            console.log("all available rooms",this.props.rooms)
          }}>...
        </p>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    allUsers: state.allReducers.UserReducer,
    currentRoom: state.allReducers.CurrentRoomReducer,
    DMRooms: state.allReducers.DMRoomReducer,
    currentUser: state.allReducers.CurrentUserReducer,
    rooms: state.allReducers.RoomReducer 
  }
};

export default connect(mapStateToProps)(LeftSideBar);