import socketIOClient from 'socket.io-client';

const endpoint = 'http://127.0.0.1:3001';

const socket = socketIOClient(endpoint);

export default socket;
