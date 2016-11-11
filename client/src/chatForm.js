import React, { PropTypes } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions/ChatActions';


const ChatForm = ( { socket, room } ) => {
  let input;
  console.log("is it here?",socket)

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          console.log("where did my socket go?",socket)
          console.log("where did my room go?",room)
          // socket.emit('chat message', input.value);
          socket.emit('chat message', {
            room: room, 
            msg: input.value
          });
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