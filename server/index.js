#!/usr/bin/env node

const program = require('commander');
const Koa = require('koa');

const app = new Koa();
const server = require('http').createServer(app.callback());
const cors = require('koa-cors');
const staticServer = require('koa-static');
const koaBody = require('koa-body');
const cp = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const router = require('./router');
const createSocket = require('./socket');

const { version } = require('../package.json');

program
    .version(version);

app.use(cors({
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
}));
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2000 * 1024 * 1024,
    },
}));
app.use(staticServer(`${__dirname}/static`));
app.use(require('./middlewares/returnData'));

app.use(router.routes());
app.use(router.allowedMethods());

// socket
createSocket(server);

const PORT = 2019;
server.listen(PORT, () => {
    console.log('🚀  启动成功');
    const url = `localhost:${PORT}/`;
    if (process.env.NODE_ENV !== 'development') {
        switch (process.platform) {
        case 'darwin':
            cp.exec(`open ${url}`);
            break;
        case 'win32':
            cp.exec(`start ${url}`);
            break;
        default:
            cp.exec(`open ${url}`);
        }
    }
});

// 创建.crui 文件夹
fs.ensureDir(path.join(process.cwd(), '.crui'));
