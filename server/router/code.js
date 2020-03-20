const Router = require('koa-router');
const codeController = require('../controller/code');

const router = new Router();

/**
 * 创建表格代码块
 */
router.get('/table', codeController.table);

/**
 * 创建表单代码块
 */
router.get('/form', codeController.form);

module.exports = router;
