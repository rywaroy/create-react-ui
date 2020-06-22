import Koa from 'koa';
import cors from 'koa-cors';
import staticServer from 'koa-static';
import koaBody from 'koa-body';
import router from './router';

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

export default app;
