const file = require('./file');
const template = require('./template');
const code = require('./code');

module.exports = function createSocket(server) {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {

        // 文件相关
        file(socket);

        // 模板相关
        template(socket);

        // 代码块相关
        code(socket);
    });
};