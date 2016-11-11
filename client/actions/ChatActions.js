import axios from 'axios';

let nextMessageId = 0;

export const ADD_MESSAGE = 'ADD_MESSAGE'
export const DOWNLOAD_ALL_MESSAGES = 'DOWNLOAD_ALL_MESSAGES'

export const addMessage = (text) => {
  return {
    type: 'ADD_MESSAGE',
    id: (nextMessageId++).toString(),
    text,
  };
};

export const downloadAllMessages = () => {
  const request = axios.get('/api/messages')
  .then( (res) => {
    //some code
    return res.map( (message) => {
      return {
        "id": message.id,
        "channelID": message.channelID,
        "text": message.message,
        "created_at": message.created_at,
        "updated_at": message.updated_at
      }
    });
  });
}