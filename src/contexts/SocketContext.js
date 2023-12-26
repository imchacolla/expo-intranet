import {createContext} from 'react';
import socketio from 'socket.io-client';

const SOCKET_URL = 'https://cmiback.miteleferico.bo/';
//const token = localStorage.getItem('access_token');

export const socket = socketio(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: true,
});

export const SocketContext = createContext();
