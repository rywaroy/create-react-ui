const Router = require('koa-router');
const documentController = require('../controller/document');

const router = new Router();

router.post('/create', documentController.create);

module.exports = router;
