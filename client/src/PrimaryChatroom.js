import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import ChatForm from './chatForm.js';
import MessageList from './ChatBody.js';
import Message from './Message.js';
import { addMessage } from '../actions/ChatActions';

class PrimaryChatroom extends React.Component {

  constructor(props){
    super(props)
    this.socket = io();
  }

  componentDidMount() {
    let that = this;
    this.socket.on('chat message', message => that.handleReceiveMessage(message) );
    this.socket.on('disconnected', message => that.handleReceiveMessage(message) );
    this.socket.on('someoneJoin', message => that.handleReceiveMessage(message) );
  }
  
  handleReceiveMessage(chat) {
    this.props.dispatch(addMessage(chat));
  }

  render(){
    const { dataStore } = this.props
    return (
      <div>
        <div>
          <MessageList />
          <Message />
        </div>
        <div>
          <ChatForm socket={this.socket} />
        </div>
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