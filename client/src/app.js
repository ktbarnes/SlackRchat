
import React, { PropTypes } from 'react';
import { dispatch, connect } from 'react-redux';
import ChatForm from './chatForm.js';
import MessageList from './ChatBody.js';
import Message from './Message.js';
import ChatReducer from '../reducers/ChatReducer.js';
import { addMessage } from '../actions/ChatActions';



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
    const { value } = this.props
    return (
      <div>
        <ChatForm value={value} socket={this.socket} />
        <MessageList value={value}/>
        <Message />
      </div>
    )
  }
}

PrimaryChatroom.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return { text: state.text }
};

export default connect(mapStateToProps)(PrimaryChatroom);