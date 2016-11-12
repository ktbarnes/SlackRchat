import axios from 'axios';
import React, { PropTypes } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';



const ChatForm = ( { socket, room } ) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }

          //this is where it pushes to the socket
          socket.emit('chat message', {
            room: room, 
            msg: input.value
          });

          //this is where you will issue a POST request to the database
          input.value = '';
        }}
      >
        <input ref={node => { input = node; }} />
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatForm;