import React, { PropTypes } from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions/ChatActions';


const ChatForm = ( { value, dispatch, socket } ) => {
  let input;
  console.log({dispatch});

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          console.log("INPUT VALUE",input.value);
          console.log("store? btw store = value",value);
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



ChatForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return { text: state.text }
};

export default connect(mapStateToProps)(ChatForm);
