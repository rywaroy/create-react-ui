import Router from 'koa-router';
import mockController from '../controller/mockData';

const router = new Router();

const { create } = mockController;

/**
 * 创建mock
 */
router.get('/page', create);

export default router;
