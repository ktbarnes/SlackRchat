import axios from 'axios';

let nextMessageId = 1000000000; //set at arbitrarily high number so as to not conflict with IDs that come in from the DB

export const ADD_MESSAGE_FROM_SOCKET = 'ADD_MESSAGE_FROM_SOCKET'
export const ADD_MESSAGE_FROM_DB = 'ADD_MESSAGE_FROM_DB'

export const addMessageFromSocket = (msg) => {
  console.log("WHAT MESAAGE AM I ADDING IN ADDMESSAGEFROMSOCKET ", msg)  
  return {
    type: 'ADD_MESSAGE_FROM_SOCKET',
    id: (nextMessageId++).toString(),
    username: msg.username,
    channelName: msg.channelName,
    channelID: msg.channelID,
    text: msg.text,
    url: msg.url,
    picture: msg.picture,
    created_at: new Date().toJSON()
  };
};

export const addMessageFromDB = (msg) => {
  return {
    type: 'ADD_MESSAGE_FROM_DB',
    id: msg.id,
    username: msg.username,
    userIDinDB: msg.userIDinDB,
    channelName: msg.channelName,
    channelIDinDB: msg.channelIDinDB,
    text: msg.text,
    url: msg.url,
    picture: msg.picture,
    created_at: msg.created_at
  };
};