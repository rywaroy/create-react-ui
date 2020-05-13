const request = require('supertest');
const fs = require('fs-extra');
const app = require('../server/app');

let server;

beforeAll(() => {
    server = request(app.listen());
    fs.ensureFileSync('test/codeCase/example.js');
});

afterAll(() => {
    fs.removeSync('test/codeCase');
});

describe('测试table接口', () => {
    it.only('/code/table 接口测试', async () => {
        const res = await server
            .post('/api/code/table')
            .send({
                url: 'test/codeCase/example.js',
                code: 'test',
            });
        expect(res.status).toBe(200);
    });
});
