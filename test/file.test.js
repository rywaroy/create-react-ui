const request = require('supertest');
const app = require('../server/app');

let server;

beforeAll(() => {
    server = request(app.listen());
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
