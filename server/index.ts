#!/usr/bin/env node

import program from 'commander';
import http from 'http';
import cp from 'child_process';
import app from './app';
import createSocket from './socket';

const server = http.createServer(app.callback());

program
    .version('2.5.2');

// socket
createSocket(server);

const PORT = 2019;
server.listen(PORT, () => {
    console.log('🚀  启动成功');
    const url = `http://localhost:${PORT}/`;
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
