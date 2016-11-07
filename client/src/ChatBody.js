import React from 'react';

const ChatBody = ({messages}) => (

  <div>
    <div className="messagesList">
      <ul id="messages"></ul>
    </div>

    <div >
      {messages}
    </div>

  </div>
);

export default ChatBody