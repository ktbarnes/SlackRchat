import React, { PropTypes } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions/ChatActions';


const ChatForm = ( { socket } ) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          socket.emit('chat message', input.value);
          input.value = '';
        }}
      >
        <input ref={node => 
          { input = node; }} 
        />
        <button type="submit">
          Send Message 
        </button>
      </form>
    </div>
  );
};

export default ChatForm;