const template = require('./template');
const code = require('./code');

module.exports = function createSocket(server) {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {

        // 心跳
        socket.on('heart-link', () => {});

        // 模板相关
        template(socket);

        // 代码块相关
        code(socket);
    });
};