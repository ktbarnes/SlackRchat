//new file for redux stuff

import React, { PropTypes } from 'react';

const Message = ({ text }) => (
  <li>
    {text}
  </li>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Message;