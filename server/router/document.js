const Router = require('koa-router');
const documentController = require('../controller/document');

const router = new Router();

router.get('/template', documentController.create);
