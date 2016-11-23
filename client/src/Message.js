import { Media } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import Giphy from './Giphy';
import { Emoji } from 'emoji-mart';

const Message = ({ created_at, text, username, url, picture }) => {

  let emoji;
  // console.log('here is the text ', text)

  if(text && text.indexOf(':') !== text.lastIndexOf(':')) {
    let first = text.indexOf(':');
    emoji = text.substring(first + 1);
    let last = emoji.indexOf(':');
    emoji = emoji.substring(0, last);
    if (emoji.indexOf(' ') !== -1) {
      emoji = undefined;
    } else {
      text = text.substring(0, first) + text.substring(last + 2, text.length);
    }
  }

  return (
    <div className="eachMessage">
      <Media>

        <Media.Left>
          <div className="mediaLeftWidth">
              <img className='chatpic' src={picture}></img>
          </div>
        </Media.Left>

        <Media.Body>
          <Media.Heading>
          {username}
          </Media.Heading>
          { text }
          { url &&
            <Giphy url={url}/>
          }
          { emoji &&
            <Emoji 
              emoji={emoji}
              size={36}
            />
          }
        </Media.Body>

        <Media.Right>
          <div className="mediaRightWidth">
            { created_at }
          </div>
        </Media.Right>

      </Media>
    </div>
  )

}

// Message.propTypes = {
//   message.text: PropTypes.string.isRequired,
// };

export default Message;


// import React, { PropTypes } from 'react';
// import Giphy from './Giphy';
// import { Emoji } from 'emoji-mart';

// const Message = ({ created_at, text, username, url, picture }) => {

//   let emoji;
//   // console.log('here is the text ', text)

//   if(text && text.indexOf(':') !== text.lastIndexOf(':')) {
//     let first = text.indexOf(':');
//     emoji = text.substring(first + 1);
//     let last = emoji.indexOf(':');
//     emoji = emoji.substring(0, last);
//     if (emoji.indexOf(' ') !== -1) {
//       emoji = undefined;
//     } else {
//       text = text.substring(0, first) + text.substring(last + 2, text.length);
//     }
//   }

//   return (
//     <li>
//       <div className='chatbodypic'>
//         <img className='chatpic' src={picture}></img>
//       <div className='msgbody'>
//         <div className='timeStamp'>
//           { created_at } ---  
//         </div>
//         <div>
//           {username} --- { text }
//           { url &&
//             <Giphy url={url}/>
//           }
//           { emoji &&
//             <Emoji 
//               emoji={emoji}
//               size={36}
//             />
//           }
//         </div>
//       </div>
//      </div> 
//     </li>
//   )

// }

// // Message.propTypes = {
// //   message.text: PropTypes.string.isRequired,
// // };

// export default Message;