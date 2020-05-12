const request = require('supertest');
const fs = require('fs-extra');
const app = require('../server/app');

let server;

beforeAll(() => {
    server = request(app.listen());
    fs.emptyDirSync('test/case');
    fs.outputFileSync('.crui/template/custom.js', `
import React, { Component } from 'react';

class Custom extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  );
    }
}
 
export default Custom;`);
});

afterAll(() => {
    fs.removeSync('test/case');
    fs.removeSync('.crui/template');
});

describe('测试template接口', () => {
    it('/template/default 接口测试', async () => {
        const res = await server.get('/api/template/default?fileName=template_default.js&url=test/case');
        expect(res.status).toBe(200);
        expect(fs.statSync('test/case/template_default.js').isFile()).toBeTruthy();
    });

    it('/template/umi 接口测试', async () => {
        const res = await server.get('/api/template/umi?fileName=template_umi.js&url=test/case');
        expect(res.status).toBe(200);
        expect(fs.statSync('test/case/template_umi.js').isFile()).toBeTruthy();
    });

    it('/template/custom 接口测试', async () => {
        const res = await server.get('/api/template/custom?url=test/case');
        expect(res.status).toBe(200);
        expect(fs.statSync('test/case/custom.js').isFile()).toBeTruthy();
    });
});
