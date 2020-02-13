const Router = require('koa-router');
const file = require('./file');
const template = require('./template');

const router = new Router();

router.use('/api/file', file.routes());
router.use('/api/template', template.routes());

module.exports = router;