const Router = require('koa-router');
const displayFiles = require('./display-files');
const fileController = require('../../controller/file');

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
router.get('/display', async ctx => {
    const files = displayFiles(process.cwd());
    try {
        ctx.success(200, '获取成功', files);
    } catch (err) {
        ctx.error(0, err.message, null);
    }
});

module.exports = router;
