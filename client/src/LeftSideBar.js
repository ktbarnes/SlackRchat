import axios from 'axios';
import React, { PropTypes } from 'react';
import LeftSideBarEntryChannel from './LeftSideBarEntry-Channel';
import { dispatch, connect } from 'react-redux';
import { addRoom, toggleSubscribeRoomOn } from '../actions/RoomActions';
import { toggleOnlineUser } from '../actions/UserActions';
import { setCurrentRoom } from '../actions/CurrentRoomActions';
import Dropdown from 'react-dropdown';
import { Nav, Button } from 'react-bootstrap';

//Reminder: props passed in( {rooms, DMRooms, allUsers, currentRoom, currentUser, dispatch, theSocket} ) => 
class LeftSideBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectValue: 'Select an option...',
      options: []
    }
    this.showNewChannelForm = false;
  }

  handleReceive(cb,body) { dispatch(cb(body))}

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

  componentWillMount() { this.input; }

  // componentWillReceiveProps(nextProps) {
  //   if(this.props.rooms.length !== nextProps.rooms.length) {
  //     this.setState({options: nextProps.rooms.map(room => room.channelName)}); 
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if(this.props.rooms.length !== nextProps.rooms.length) {
      let myOptions = nextProps.rooms.map(room => room.channelName);
      myOptions = myOptions.concat("Add A New Channel...")
      this.setState({options: myOptions}); 
    }
  }

  render() {
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
                // console.log("room created in DB!", response);
                let roomToAdd = {
                  id: response.data[0],
                  channelName: thisInput,
                  currentRoomToggle: false,
                  AmISubscribedToggle: true
                }
                console.log("this is the room I added",roomToAdd)
                this.props.dispatch(addRoom(roomToAdd));
                axios.post('/db/addMyChannel',{
                  myUserID: this.props.currentUser.id,
                  channelID: response.data[0]
                })
              })
              .catch((err) => console.error(err))

              //reinitialize the input field
              this.input.value = '';
              this.showNewChannelForm = false;
              
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
              <LeftSideBarEntryChannel theSocket={this.props.theSocket} eventKey={i} key={room.id} room={room} />
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
        <p 
          onClick={ () => {
            console.log("this is my current room",this.props.currentRoom);
            console.log("this is my current user",this.props.currentUser);
            console.log("these are my DM Rooms",this.props.DMRooms)
            console.log("this is all the users after",this.props.allUsers);
            console.log("all available rooms",this.props.rooms)
          }}>.....
        </p>

      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  // console.log("all messages",state.allReducers.ChatReducer)
  return { 
    allUsers: state.allReducers.UserReducer,
    currentRoom: state.allReducers.CurrentRoomReducer,
    DMRooms: state.allReducers.DMRoomReducer,
    currentUser: state.allReducers.CurrentUserReducer,
    rooms: state.allReducers.RoomReducer 
  }
};

export default connect(mapStateToProps)(LeftSideBar);