const SocketIo = require('socket.io');
const publish = require('./publish');

module.exports = function createSocket(server) {
    const io = SocketIo(server);

    io.on('connection', socket => {
        // 心跳
        socket.on('heart-link', () => {});

        // 构建发布
        publish(socket);
    });
};
