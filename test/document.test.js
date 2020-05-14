const request = require('supertest');
const fs = require('fs-extra');
const app = require('../server/app');

let server;

beforeAll(() => {
    server = request(app.listen());
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
});

describe('测试document接口', () => {
    it('/document/create 接口测试', async () => {
        const res = await server.post('/api/document/create')
            .field('output', 'test/documentCase')
            .attach('file', 'test/documentCase/index.js');
        expect(res.status).toBe(200);
        expect(fs.statSync('test/documentCase/Custom.md').isFile()).toBeTruthy();
    });
});
