const SocketIo = require('socket.io');

module.exports = function createSocket(server) {
    const io = SocketIo(server);

    io.on('connection', socket => {
        // 心跳
        socket.on('heart-link', () => {});
    });
};
