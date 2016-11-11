import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import ChatForm from './chatForm.js';
import MessageList from './ChatBody.js';
import Message from './Message.js';
import ChatReducer from '../reducers/ChatReducer.js';
import { addMessage } from '../actions/ChatActions';
import Nav from './nav.js';
import SideBar from './sidebar.js';


class PrimaryChatroom extends React.Component {

  constructor(props){
    super(props)
    this.socket = io();
  }

  componentDidMount() {
    let that = this;
    this.socket.on('chat message', function(message){
      that.handleReceiveMessage(message);
    });
    this.socket.on('disconnect', function(message){
      that.handleReceiveMessage(message);
    });
  }
  
  handleReceiveMessage(chat) {
    this.props.dispatch(addMessage(chat));
  }


  render(){
    const { dataStore } = this.props
    return (
      <div>
        <Nav />
        <SideBar/>
        <ChatForm socket={this.socket} />
        <MessageList />
        <Message />
      </div>
    )
  }
}


PrimaryChatroom.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return { state: state.allReducers.ChatReducer }
};

export default connect(mapStateToProps)(PrimaryChatroom);