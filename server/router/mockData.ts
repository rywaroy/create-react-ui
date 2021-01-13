import Router from 'koa-router';
import mockController from '../controller/mockData';

const router = new Router();

const { create } = mockController;

/**
 * 创建mock
 */
router.post('/createMock', create);

export default router;
