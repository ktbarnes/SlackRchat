import React, { PropTypes } from 'react';

const Message = ({ created_at, text, username }) => (
  <li>
    { created_at } --- {username}: { text }
  </li>
);

// Message.propTypes = {
//   message.text: PropTypes.string.isRequired,
// };

export default Message;