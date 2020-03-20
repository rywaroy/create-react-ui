const Router = require('koa-router');
const templateController = require('../controller/template');

const router = new Router();

/**
 * 创建默认模板
 */
router.get('/default', templateController.default);

/**
 * 创建umi模板
 */
router.get('/umi', templateController.umi);

/**
 * 创建自定义模板
 */
router.get('/custom', templateController.custom);

module.exports = router;
