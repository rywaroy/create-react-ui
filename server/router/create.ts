import Router from 'koa-router';
import createController from '../controller/create';

const router = new Router();

/**
 * 获取插件列表
 */
router.get('/list', createController.list);

/**
 * 创建工程
 */
router.post('/create', createController.create);

export default router;
