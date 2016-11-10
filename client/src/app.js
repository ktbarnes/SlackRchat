import React from 'react';
import ChatForm from './chatForm.js';
import MessageList from './ChatBody.js';
import Message from './Message.js';
import ChatReducer from '../reducers/ChatReducer.js';



class PrimaryChatroom extends React.Component {

  render(){
    // const { value } = this.props
    console.log('PrimaryChatroom props line 78++++', this.props)
    let realValue = this.props.route.value.ChatReducer;
    console.log('PrimaryChatroom realValue line 80++++', realValue)
    return (
      <div>
        <ChatForm value={realValue} />
        <MessageList value={realValue}/>
        <Message />
      </div>
    )
  }
}

export default PrimaryChatroom;