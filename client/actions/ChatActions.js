import axios from 'axios';

let nextMessageId = 1000000000; //set at arbitrarily high number so as to not conflict with IDs that come in from the DB

export const ADD_MESSAGE_FROM_SOCKET = 'ADD_MESSAGE_FROM_SOCKET'
export const ADD_MESSAGE_FROM_DB = 'ADD_MESSAGE_FROM_DB'

export const addMessageFromSocket = (msg) => {
  return {
    type: 'ADD_MESSAGE_FROM_SOCKET',
    id: (nextMessageId++).toString(),
    channelID: msg.channelID,
    text: msg.text,
    created_at: new Date().toJSON()
  };
};

export const addMessageFromDB = (msg) => {
  return {
    type: 'ADD_MESSAGE_FROM_DB',
    id: msg.id,
    username: msg.username,
    channel: msg.channel,
    text: msg.text,
    created_at: msg.created_at

  };
};