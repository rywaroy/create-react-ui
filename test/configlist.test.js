const request = require('supertest');
const fs = require('fs-extra');
const app = require('../server/app');

let server;

beforeAll(() => {
    server = request(app.listen());
    fs.ensureFileSync('node_modules/.cache/curi/label.json');
});

afterAll(() => {
    fs.removeSync('node_modules/.cache/curi/label.json');
});

describe('测试configlist接口', () => {
    it('/configlist/label get 接口测试', async () => {
        const res = await server.get('/api/configlist/label');
        expect(res.status).toBe(200);
    });
});
