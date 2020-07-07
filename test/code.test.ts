import request from 'supertest';
import fs from 'fs-extra';
import { Server } from 'http';
import app from '../server/app';

let server: Server;

const tableParams = { columns: [{ titleText: '标题1', dataIndex: '标题1' }, { titleText: '标题2', dataIndex: '标题2' }], dataSource: [{ id: 1, 标题1: '测试数据1', 标题2: '测试数据1', 标题3: '测试数据1', 标题4: '测试数据1', 标题5: '测试数据1' }], variable: 'listColumn' };

const formParams = { options: [{ type: 'input', label: 'input', name: 'input' }], name: 'listFilter', labelCol: 8, wrapperCol: 16, width: 1000, title: '标题', span: 24 };

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
                ...tableParams,
            });
        expect(res.status).toBe(200);
    });

    it('/code/form 接口测试', async () => {
        const res = await request(server)
            .post('/api/code/form')
            .send({
                url: 'test/codeCase/example.js',
                ...formParams,
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
                    formObject: formParams,
                    tableObject: tableParams,
                    title: 'title',
                    buttons: [{ title: 'btn1', linkName: 'listFilter11' }],
                    popupForms: [
                        formParams,
                        formParams,
                    ],
                },
            });
        expect(res.status).toBe(200);
        expect(fs.statSync('test/codeCase/listpage/index.js').isFile()).toBeTruthy();
        expect(fs.statSync('test/codeCase/listpage/model.js').isFile()).toBeTruthy();
        expect(fs.statSync('test/codeCase/listpage/map.js').isFile()).toBeTruthy();
    });
});
