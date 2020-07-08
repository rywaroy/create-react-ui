import io from 'socket.io-client';

const socket = io('http://localhost:2019');

export default socket;
