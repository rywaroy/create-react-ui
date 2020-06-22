import Router from 'koa-router';
import configlistController from '../controller/configlist';

const router = new Router();

/**
 * 获取label配置项
 */
router.get('/label', configlistController.label);

/**
 * 添加label配置项
 */
router.post('/label', configlistController.addLabel);

/**
 * 删除label配置项
 */
router.del('/label', configlistController.delLabel);

/**
 * 修改label配置项
 */
router.patch('/label', configlistController.patchLabel);

/**
 * 展示/隐藏label
 */
router.post('/label/display', configlistController.displayLabel);

export default router;
