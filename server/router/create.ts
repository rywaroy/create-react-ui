import Router from 'koa-router';
import createController from '../controller/create';

const router = new Router();

/**
 * 获取插件列表
 */
router.get('/list', createController.list);

export default router;
