const request = require('supertest');
const fs = require('fs-extra');
const path = require('path');
const app = require('../server/app');

let server;

beforeAll(() => {
    server = app.listen();
    fs.ensureFileSync('test/fileCase/example.js');
});

afterAll(() => {
    fs.removeSync('test/fileCase');
    server.close();
});

describe('测试file接口', () => {
    it('/file/template 接口测试', async () => {
        const res = await request(server).get('/api/file/template');
        expect(res.status).toBe(200);
    });

    it('/file/isjs 接口测试', async () => {
        const res = await request(server).get('/api/file/isjs?url=test/fileCase/example.js');
        expect(res.body.status).toBe(200);
    });

    it('/file/display 接口测试', async () => {
        const res = await request(server).get('/api/file/display');
        expect(res.status).toBe(200);
    });

    it('/file/folder 接口测试', async () => {
        const res = await request(server).get(`/api/file/folder?base=${path.join(process.cwd(), 'test', 'fileCase')}`);
        expect(res.body.data.list.length).toBe(1);
    });

    it('/file/isfolder 接口测试', async () => {
        const res = await request(server).get('/api/file/isfolder?url=test/fileCase');
        expect(res.body.status).toBe(200);
    });

    it('/file/isJsOrFolder 接口测试', async () => {
        const res = await request(server).get('/api/file/isJsOrFolder?url=test/fileCase/example.js');
        expect(res.body.status).toBe(200);
        const res2 = await request(server).get('/api/file/isJsOrFolder?url=test/fileCase');
        expect(res2.body.status).toBe(200);
    });
});
