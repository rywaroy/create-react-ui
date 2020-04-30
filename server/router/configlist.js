const Router = require('koa-router');
const configlistController = require('../controller/configlist');

const router = new Router();

/**
 * 获取label配置项
 */
router.get('/label', configlistController.label);

/**
 * 添加label配置项
 */
router.post('/label', configlistController.addLabel);


module.exports = router;
