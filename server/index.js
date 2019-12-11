const Koa = require('koa');

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const cors = require('koa-cors');
const bodyparser = require('koa-bodyparser');
const staticServer = require('koa-static');

const router = require('./router');
const file = require('./socket/file');
const template = require('./socket/template');

app.use(cors({
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
}));
app.use(bodyparser({
    formLimit: '5mb',
}));
app.use(staticServer(`${__dirname}/static`));

app.use(router.routes());
app.use(router.allowedMethods());

io.on('connection', (socket) => {

    // 文件相关
    file(socket);

    // 模板相关
    template(socket);
});

server.listen(2019);