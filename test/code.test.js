const request = require('supertest');
const fs = require('fs-extra');
const app = require('../server/app');

let server;

beforeAll(() => {
    server = app.listen();
    fs.ensureFileSync('test/codeCase/example.js');
});

afterAll(() => {
    fs.removeSync('test/codeCase');
    server.close();
});

describe('测试table接口', () => {
    it('/code/table 接口测试', async () => {
        const res = await request(server)
            .post('/api/code/table')
            .send({
                url: 'test/codeCase/example.js',
                code: 'test',
            });
        expect(res.status).toBe(200);
    });

    it('/code/form 接口测试', async () => {
        const res = await request(server)
            .post('/api/code/form')
            .send({
                url: 'test/codeCase/example.js',
                code: 'test',
            });
        expect(res.status).toBe(200);
    });

    it('/code/listpage 接口测试', async () => {
        const res = await request(server)
            .post('/api/code/listpage')
            .send({
                url: 'test/codeCase',
                name: 'listpage',
                namespace: 'listPage',
                pageOption: {
                    formCode: 'formCode',
                    tableCode: 'tableCode',
                    title: 'title',
                    buttons: [{ title: 'btn1', linkName: 'listFilter11' }],
                    tableData: [
                        {
                            id: 1,
                            标题1: '测试数据1',
                            标题2: '测试数据1',
                            标题3: '测试数据1',
                            标题4: '测试数据1',
                            标题5: '测试数据1',
                        },
                        {
                            id: 2,
                            标题1: '测试数据2',
                            标题2: '测试数据2',
                            标题3: '测试数据2',
                            标题4: '测试数据2',
                            标题5: '测试数据2',
                        },
                    ],
                    popupForms: [
                        {
                            code: 'export function listFilter11(_self) { return [{"label":"input","name":"input","type":"input"},{"label":"input","name":"input","type":"input"}]; }',
                            options: [
                                { label: 'input', name: 'input', type: 'input' },
                                { label: 'input', name: 'input', type: 'input' },
                            ],
                            name: 'listFilter11',
                            variableType: 'Function',
                            labelCol: 8,
                            wrapperCol: 16,
                            width: 520,
                            title: '标题1',
                        },
                        {
                            code: 'export function listFilter11(_self) { return [{"label":"input","name":"input","type":"input"},{"label":"input","name":"input","type":"input"}]; }',
                            options: [
                                { label: 'input', name: 'input', type: 'input' },
                                { label: 'input', name: 'input', type: 'input' },
                            ],
                            name: 'listFilter22',
                            variableType: 'Function',
                            labelCol: 8,
                            wrapperCol: 16,
                            width: 520,
                            title: '标题2',
                        },
                    ],
                },
            });
        expect(res.status).toBe(200);
        expect(fs.statSync('test/codeCase/listpage/index.js').isFile()).toBeTruthy();
        expect(fs.statSync('test/codeCase/listpage/model.js').isFile()).toBeTruthy();
        expect(fs.statSync('test/codeCase/listpage/map.js').isFile()).toBeTruthy();
    });
});
