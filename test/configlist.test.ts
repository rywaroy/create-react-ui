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

describe('测试label接口', () => {
    it('/configlist/label GET 接口测试', async () => {
        const res = await request(server).get('/api/configlist/label');
        expect(res.status).toBe(200);
    });

    it('/configlist/label POST 接口测试', async () => {
        const res = await request(server)
            .post('/api/configlist/label')
            .send({ name: 'test' });
        expect(res.status).toBe(200);
        const res2 = await request(server).get('/api/configlist/label');
        expect(res2.body.data.list.length).toBe(1);
    });

    it('/configlist/label PATCH 接口测试', async () => {
        const res = await request(server).get('/api/configlist/label');
        const { id } = res.body.data.list[0];
        const res2 = await request(server)
            .patch('/api/configlist/label')
            .send({ name: 'test2', id });
        expect(res2.status).toBe(200);
        const res3 = await request(server).get('/api/configlist/label');
        expect(res3.body.data.list[0].name).toBe('test2');
    });

    it('/configlist/label DELETE 接口测试', async () => {
        const res = await request(server).get('/api/configlist/label');
        const { id } = res.body.data.list[0];
        const res2 = await request(server).delete(`/api/configlist/label?id=${id}`);
        expect(res2.status).toBe(200);
        const res3 = await request(server).get('/api/configlist/label');
        expect(res3.body.data.list.length).toBe(0);
    });

    it('/configlist/label/display 接口测试', async () => {
        const res = await request(server)
            .post('/api/configlist/label/display')
            .send({ display: true });
        expect(res.status).toBe(200);
        const res2 = await request(server).get('/api/configlist/label');
        expect(res2.body.data.display).toBeTruthy();
    });
});

describe('测试classList接口', () => {
    it('/configlist/class GET 接口测试', async () => {
        const res = await request(server).get('/api/configlist/class');
        expect(res.status).toBe(200);
    });

    it('/configlist/class POST 接口测试', async () => {
        const res = await request(server)
            .post('/api/configlist/class')
            .send({ name: 'test', value: 'test' });
        expect(res.status).toBe(200);
        const res2 = await request(server).get('/api/configlist/class');
        expect(res2.body.data.list.length).toBe(1);
    });
});
