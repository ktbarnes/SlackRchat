import React, { PropTypes } from 'react';

const SideBarEntryChannel = ({ room }) => (
  <li>
    * { room }
  </li>
);

// Message.propTypes = {
//   message.text: PropTypes.string.isRequired,
// };

export default SideBarEntryChannel;