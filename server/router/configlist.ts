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

/**
 * 获取class列表
 */
router.get('/class', configlistController.classList);

/**
 * 添加class列表
 */
router.post('/class', configlistController.addClassList);

/**
 * 删除class列表
 */
router.del('/class', configlistController.delClassList);

/**
 * 修改class列表
 */
router.patch('/class', configlistController.patchClassList);

export default router;
