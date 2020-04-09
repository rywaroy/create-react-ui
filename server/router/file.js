const Router = require('koa-router');
const fileController = require('../controller/file');

const router = new Router();

/**
 * 获取.crui/template下模板文件的目录
 */
router.get('/template', fileController.template);

/**
 * 判断是否是js文件
 */
router.get('/isjs', fileController.isjs);

/**
 * 获取文件目录
 */
router.get('/display', fileController.display);

/**
 * 获取夹目录结构
 */
router.get('/folder', fileController.folder);

/**
 * 判断是否是文件夹
 */
router.get('/isfolder', fileController.isfolder);

module.exports = router;
