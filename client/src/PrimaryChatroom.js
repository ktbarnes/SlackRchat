import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import ChatForm from './chatForm.js';
import MessageList from './ChatBody.js';
import Message from './Message.js';
import { addMessage } from '../actions/ChatActions';

class PrimaryChatroom extends React.Component {

  constructor(props){
    super(props)
    console.log("what are my props",this.props)
    this.socket = io('/Hack-Reactor-NameSpace');
    this.room = this.props.rooms[0].room;
  }

  componentDidMount() {
    let that = this;
    this.socket.on('chat message', message => that.handleReceiveMessage(message) );
    this.socket.on('disconnected', message => that.handleReceiveMessage(message) );
    this.socket.on('someoneJoin', message => that.handleReceiveMessage(message) );
    
    //room stuff
    that.room = this.room;
    console.log("socket is here",this.socket)
    this.socket.on('connect', function() {
       // Connected, let's sign-up for to receive messages for this room
       that.socket.emit('changeRoom', that.room);
       console.log("what room",that.room)
    });

  }
  
  handleReceiveMessage(chat) {
    this.props.dispatch(addMessage(chat));
  }

  render(){
    return (
      <div>
        <div>
          <MessageList room={this.room}/>
          <Message />
        </div>
        <div>
          <ChatForm socket={this.socket} room={this.room} />
        </div>
      </div>
    )
  }
}


PrimaryChatroom.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  console.log("in primarychatroom", state.allReducers.RoomReducer)
  return { rooms: state.allReducers.RoomReducer }
};

export default connect(mapStateToProps)(PrimaryChatroom);