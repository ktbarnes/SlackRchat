import React, { PropTypes } from 'react';

const Message = ({ created_at, text }) => (
  <li>
    { created_at }: { text }
  </li>
);

// Message.propTypes = {
//   message.text: PropTypes.string.isRequired,
// };

export default Message;