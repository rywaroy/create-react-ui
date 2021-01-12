import request from 'supertest';
import fs from 'fs-extra';
import { Server } from 'http';
import app from '../server/app';

let server: Server;

beforeAll(() => {
    server = app.listen();
    fs.mkdirSync('test/mockData');
});

afterAll(() => {
    // fs.removeSync('test/mockData');
    server.close();
});

describe('测试mockData接口', () => {
    it('测试创建新mock文件', async () => {
        const res = await request(server)
            .post('/api/mockData/createMock')
            .send({
                mockObject: {
                    code: '200',
                    count: '50',
                    result: 'success',
                    data: [{}],
                },
                url: '/aaa',
                method: 'GET',
                path: 'test/mockData',
                serverName: '',
                fileName: 'a.js',
                baseUrl: '/marketingScoreNode/proxy/tradeManager',
            });
        expect(res.status).toBe(200);
    });
});
