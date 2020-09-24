import Router from 'koa-router';
import makingController from '../controller/making';

const router = new Router();

/**
 * 获取page列表
 */
router.get('/page', makingController.pageList);

/**
 * 添加page列表
 */
router.post('/page', makingController.addPageList);

/**
 * 删除page列表
 */
router.del('/page', makingController.delPageList);

/**
 * 预览代码
 */
router.post('/preview', makingController.preview);

/**
 * 生成代码
 */
router.post('/create', makingController.create);

export default router;
