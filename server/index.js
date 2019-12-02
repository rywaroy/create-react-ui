const Koa = require('koa');

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const file = require('./file');
const template = require('./template');

io.on('connection', (socket) => {

    // 文件相关
    file(socket);

    // 模板相关
    template(socket);
});

server.listen(2019);