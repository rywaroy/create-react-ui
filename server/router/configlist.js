const Router = require('koa-router');
const configlistController = require('../controller/configlist');

const router = new Router();

/**
 * 获取label配置项
 */
router.get('/label', configlistController.label);


module.exports = router;
