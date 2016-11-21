import React, { PropTypes } from 'react';
import Giphy from './Giphy';

const Message = ({ created_at, text, username, url, picture }) => {

  return (
    <li>
      <div className='msgbody'>
        <img className='chatpic' src={picture}></img>
      </div>
      <div className='msgbody'>
        <div>
          { created_at } ---  
        </div>
        <div>
          {username} --- { text }
          { url &&
            <Giphy url={url}/>
          }
        </div>
      </div>
    </li>
  )

}

// Message.propTypes = {
//   message.text: PropTypes.string.isRequired,
// };

export default Message;