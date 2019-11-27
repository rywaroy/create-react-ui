const Koa = require('koa');

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const file = require('./file');

io.on('connection', (socket) => {

    // 文件相关
    file(socket);
});

server.listen(2019);