const request = require('supertest');
const fs = require('fs-extra');
const path = require('path');
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

    it('/file/display 接口测试', async () => {
        const res = await server.get('/api/file/display');
        expect(res.status).toBe(200);
    });

    it('/file/folder 接口测试', async () => {
        const res = await server.get(`/api/file/folder?base=${path.join(process.cwd(), 'test', 'case')}`);
        expect(res.body.data.list.length).toBe(1);
    });

    it('/file/isfolder 接口测试', async () => {
        const res = await server.get('/api/file/isfolder?url=test/case');
        expect(res.body.status).toBe(200);
    });

    it('/file/isJsOrFolder 接口测试', async () => {
        const res = await server.get('/api/file/isJsOrFolder?url=test/case/example.js');
        expect(res.body.status).toBe(200);
        const res2 = await server.get('/api/file/isJsOrFolder?url=test/case');
        expect(res2.body.status).toBe(200);
    });
});
