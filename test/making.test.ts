import request from 'supertest';
import fs from 'fs-extra';
import { Server } from 'http';
import app from '../server/app';

let server: Server;

beforeAll(() => {
    server = app.listen();
    fs.ensureDirSync('node_modules/.cache/crui');
});

afterAll(() => {
    fs.removeSync('node_modules/.cache/crui');
    server.close();
});

describe('测试pageList接口', () => {
    it('/making/page GET 接口测试', async () => {
        const res = await request(server).get('/api/making/page');
        expect(res.status).toBe(200);
    });

    it('/making/page POST 接口测试', async () => {
        const res = await request(server)
            .post('/api/making/page')
            .send({ title: 'test', value: 'test' });
        expect(res.status).toBe(200);
        const res2 = await request(server).get('/api/making/page');
        expect(res2.body.data.length).toBe(1);
    });
});
