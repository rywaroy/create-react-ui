const Router = require('koa-router');
const file = require('./file');
const template = require('./template');
const code = require('./code');

const router = new Router();

router.use('/api/file', file.routes());
router.use('/api/template', template.routes());
router.use('/api/code', code.routes());

module.exports = router;