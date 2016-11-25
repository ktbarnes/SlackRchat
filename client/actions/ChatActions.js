import axios from 'axios';
import moment from 'moment';

let nextMessageId = 1000000000; //set at arbitrarily high number so as to not conflict with IDs that come in from the DB

/*
Note to user: 
ChatAction controls all messages downloaded from either the socket (i.e. through live chatting after the user has logged
in) or the database (i.e. once the user logs in and all the information is downloaded) These actions are then correspondingly
sent into the ChatReducer
*/

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
    created_at: moment(new Date()).calendar()
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
    created_at: moment(new Date(msg.created_at)).format('llll') //had been .calendar()
  };
};