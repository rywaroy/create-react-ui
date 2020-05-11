const request = require('supertest');
const fs = require('fs-extra');
const app = require('../server/app');

let server;

beforeAll(() => {
    server = request(app.listen());
    fs.ensureFileSync('test/case/example.js');
});

afterAll(() => {
    fs.removeSync('test/case');
});

describe('测试file接口', () => {
    it('/file/template 接口测试', async () => {
        const res = await server.get('/api/file/template');
        expect(res.status).toBe(200);
    });

    it('/file/isjs 接口测试', async () => {
        const res = await server.get('/api/file/isjs?url=test/case/example.js');
        expect(res.body.status).toBe(200);
    });
});
