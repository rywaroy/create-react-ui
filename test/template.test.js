const request = require('supertest');
const fs = require('fs-extra');
const app = require('../server/app');

let server;

beforeAll(() => {
    server = request(app.listen());
    fs.emptyDirSync('test/case');
});

afterAll(() => {
    fs.removeSync('test/case');
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
});
