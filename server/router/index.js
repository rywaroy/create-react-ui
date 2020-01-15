const Router = require('koa-router');
const file = require('./file');

const router = new Router();

router.use('/api/file', file.routes());

module.exports = router;