import React, { PropTypes } from 'react';
import Giphy from './Giphy';

const Message = ({ created_at, text, username, url }) => {

  return (
    <li>
      <div>
        { created_at } ---  
      </div>
      <div>
        {username} --- { text }
        { url &&
          <Giphy url={url}/>
        }
      </div>
    </li>
  )

}

// Message.propTypes = {
//   message.text: PropTypes.string.isRequired,
// };

export default Message;