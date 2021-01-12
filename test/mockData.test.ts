import request from 'supertest';
import fs from 'fs-extra';
import { Server } from 'http';
import app from '../server/app';

let server: Server;

beforeAll(() => {
    server = app.listen();
    fs.outputFileSync('test/mockData/services.js', '');
});

afterAll(() => {
    fs.removeSync('test/mockData');
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
        expect(fs.statSync('test/mockData/a.js').isFile()).toBeTruthy();
    });

    it('测试添加mock对象', async () => {
        const res = await request(server)
            .post('/api/mockData/createMock')
            .send({
                mockObject: {
                    code: '200',
                    count: '50',
                    result: 'success',
                    data: [{}],
                },
                url: '/bbb',
                method: 'GET',
                path: 'test/mockData/a.js',
                serverName: '',
                baseUrl: '/marketingScoreNode/proxy/tradeManager',
            });
        expect(res.status).toBe(200);
        expect(fs.readFileSync('test/mockData/a.js', 'utf-8')).toMatch('bbb');
    });

    it('测试添加services方法', async () => {
        const res = await request(server)
            .post('/api/mockData/createMock')
            .send({
                mockObject: {
                    code: '200',
                    count: '50',
                    result: 'success',
                    data: [{}],
                },
                url: '/ccc',
                method: 'GET',
                path: 'test/mockData/a.js',
                serverName: 'getList',
                serverPath: 'test/mockData/services.js',
                baseUrl: '/marketingScoreNode/proxy/tradeManager',
            });
        expect(res.status).toBe(200);
        expect(fs.readFileSync('test/mockData/services.js', 'utf-8')).toMatch('getList');
    });
});
