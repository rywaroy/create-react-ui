const request = require('supertest');
const app = require('../server/app');

describe('测试file接口', () => {
    it('/file/template 接口测试', async done => {
        const res = await request(app.listen(2019)).get('/api/file/template');
        expect(res.status).toBe(200);
        done();
    });
});
