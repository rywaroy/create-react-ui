#!/usr/bin/env node

const program = require('commander');
const server = require('http').createServer(app.callback());
const cp = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const app = require('./app');
const createSocket = require('./socket');

const { version } = require('../package.json');

program
    .version(version);

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
