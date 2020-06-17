import Router from 'koa-router';
import codeController from '../controller/code';

const router = new Router();

/**
 * 创建表格代码块
 */
router.post('/table', codeController.table);

/**
 * 创建表单代码块
 */
router.post('/form', codeController.form);

/**
 * 创建列表页面
 */
router.post('/listpage', codeController.listpage);

export default router;
