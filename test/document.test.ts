import request from 'supertest';
import fs from 'fs-extra';
import app from '../server/app';

let server;

beforeAll(() => {
    server = app.listen();
    fs.emptyDirSync('test/documentCase');
    fs.outputFileSync('test/documentCase/index.js', `
import React, { Component } from 'react';

// 注释
class Custom extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>111</div>
        );
    }
}
 
export default Custom;`);
});

afterAll(() => {
    fs.removeSync('test/documentCase');
    server.close();
});

describe('测试document接口', () => {
    it('/document/create 接口测试', async () => {
        const res = await request(server).post('/api/document/create')
            .field('output', 'test/documentCase')
            .attach('file', 'test/documentCase/index.js');
        expect(res.status).toBe(200);
        expect(fs.statSync('test/documentCase/Custom.md').isFile()).toBeTruthy();
    });
});
