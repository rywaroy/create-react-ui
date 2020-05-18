const request = require('supertest');
const fs = require('fs-extra');
const app = require('../server/app');

let server;

beforeAll(() => {
    server = request(app.listen());
    fs.ensureDirSync('node_modules/.cache/crui');
});

afterAll(() => {
    fs.removeSync('node_modules/.cache/crui');
});

describe('测试configlist接口', () => {
    it('/configlist/label GET 接口测试', async () => {
        const res = await server.get('/api/configlist/label');
        expect(res.status).toBe(200);
    });

    it('/configlist/label POST 接口测试', async () => {
        const res = await server
            .post('/api/configlist/label')
            .send({ name: 'test' });
        expect(res.status).toBe(200);
        const res2 = await server.get('/api/configlist/label');
        expect(res2.body.data.list.length).toBe(1);
    });

    it('/configlist/label PATCH 接口测试', async () => {
        const res = await server.get('/api/configlist/label');
        const { id } = res.body.data.list[0];
        const res2 = await server
            .patch('/api/configlist/label')
            .send({ name: 'test2', id });
        expect(res2.status).toBe(200);
        const res3 = await server.get('/api/configlist/label');
        expect(res3.body.data.list[0].name).toBe('test2');
    });

    it('/configlist/label DELETE 接口测试', async () => {
        const res = await server.get('/api/configlist/label');
        const { id } = res.body.data.list[0];
        const res2 = await server.delete(`/api/configlist/label?id=${id}`);
        expect(res2.status).toBe(200);
        const res3 = await server.get('/api/configlist/label');
        expect(res3.body.data.list.length).toBe(0);
    });

    it('/configlist/label/display 接口测试', async () => {
        const res = await server
            .post('/api/configlist/label/display')
            .send({ display: true });
        expect(res.status).toBe(200);
        const res2 = await server.get('/api/configlist/label');
        expect(res2.body.data.display).toBeTruthy();
    });
});
