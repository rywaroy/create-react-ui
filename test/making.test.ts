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
    fs.removeSync('test/example');
    server.close();
});

const materials = [
    {
        tag: 'main',
        props: {},
        haveChildren: true,
        from: '@/components',
        ext: {
            code: {
                'index.js': {
                    importDeclaration: {
                        dva: {
                            export: ['useDispatch', 'useSelector'],
                            react: { default: 'React', export: ['useEffect'] },
                        },
                    },
                    useEffect: [],
                },
            },
        },
        children: [
            {
                tag: 'GenerateForm',
                props: {},
                haveChildren: false,
                from: '@/components',
                ext: {
                    code: {
                        'index.js': {
                            importDeclaration: {
                                '@/componenets': { export: ['GenerateForm'] },
                            },
                        },
                    },
                },
            },
        ],
    },
];

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

    it('/making/page DELETE 接口测试', async () => {
        const res = await request(server).get('/api/making/page');
        const { id } = res.body.data[0];
        const res2 = await request(server).delete(`/api/making/page?id=${id}`);
        expect(res2.status).toBe(200);
        const res3 = await request(server).get('/api/making/page');
        expect(res3.body.data.length).toBe(0);
    });

    it('/making/prview 预览接口测试', async () => {
        const res = await request(server)
            .post('/api/making/preview')
            .send({
                name: 'listpage',
                namespace: 'listpage',
                url: 'test/example',
                materials,
            });
        expect(res.status).toBe(200);
    });

    it('/making/create 创建代码测试', async () => {
        const res = await request(server)
            .post('/api/making/create')
            .send({
                name: 'listpage',
                namespace: 'listpage',
                url: 'test/example',
                materials,
            });
        expect(res.status).toBe(200);
        expect(fs.statSync('test/example/listpage/index.js').isFile()).toBeTruthy();
    });
});
