import request from 'supertest';
import fs from 'fs-extra';
import path from 'path';
import { Server } from 'http';
import app from '../server/app';

let server: Server;

beforeAll(() => {
    server = app.listen();
    fs.mkdirSync(path.join(process.cwd(), 'example'));
});

afterAll(() => {
    fs.removeSync('example');
    server.close();
});

describe('测试create接口', () => {
    it('/create/list 接口测试', async () => {
        const res = await request(server)
            .get('/api/create/list?project=example');
        expect(res.body.data.isEmpty).toBeTruthy();
        expect(res.status).toBe(200);
    });
});
