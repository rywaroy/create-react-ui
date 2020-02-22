module.exports = function createSocket(server) {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
        // 心跳
        socket.on('heart-link', () => {});
    });
};
