const Koa = require('koa');
const cors = require('koa-cors');
const staticServer = require('koa-static');
const koaBody = require('koa-body');
const router = require('./router');

const app = new Koa();

app.use(cors({
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
}));
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2000 * 1024 * 1024,
    },
}));
app.use(staticServer(`${__dirname}/static`));
app.use(require('./middlewares/returnData'));

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
