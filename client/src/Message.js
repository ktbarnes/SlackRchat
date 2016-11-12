import React, { PropTypes } from 'react';

const Message = ({ created_at, text, username }) => (
  <li>
    <div>
      { created_at } ---  
    </div>
    <div>
      {username} --- { text }
    </div>
  </li>
);

// Message.propTypes = {
//   message.text: PropTypes.string.isRequired,
// };

export default Message;