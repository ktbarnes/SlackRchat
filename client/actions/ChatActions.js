import axios from 'axios';

let nextMessageId = 0;

export const ADD_MESSAGE = 'ADD_MESSAGE'
export const DOWNLOAD_FROM_DB = 'DOWNLOAD_FROM_DB'

export const addMessage = (msg) => {
  return {
    type: 'ADD_MESSAGE',
    // id: (nextMessageId++).toString(),
    id: msg.id,
    channelID: msg.channelID,
    text: msg.text,
    created_at: msg.created_at,
    updated_at: msg.updated_at

  };
};

// export const downloadAllMessages = (chatObj) => {
//   return {
//     type: 'DOWNLOAD_FROM_DB',
//     chatObj,
//   };
// }

