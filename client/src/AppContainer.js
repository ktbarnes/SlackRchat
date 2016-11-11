import React, { PropTypes } from 'react';
import ChatForm from './chatForm.js';
import MessageList from './ChatBody.js';
import Message from './Message.js';
import ChatReducer from '../reducers/ChatReducer.js';
import { addMessage } from '../actions/ChatActions';
import Nav from './nav.js';
import PrimaryChatroom from './PrimaryChatroom.js';
import SideBar from './sidebar.js';

class AppContainer extends React.Component {

  render(){
    const { dataStore } = this.props
    return (
      <div>

        <div><Nav /></div>
        
        <div>
          <div><SideBar /></div>
          <div><PrimaryChatroom /></div>
        </div>

      </div>
    )
  }
}

export default AppContainer