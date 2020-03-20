const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
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
router.get('/isjs', async ctx => {
    const base = path.join(process.cwd(), ctx.query.url ? ctx.query.url : '');
    if (fs.existsSync(base)) {
        const stat = fs.statSync(base);
        if (stat.isFile()) {
            if (path.extname(base) === '.js') {
                ctx.success(200, '验证成功', null);
            } else {
                ctx.error(-1, '不是js文件', null);
            }
        } else {
            ctx.error(-1, '不是文件', null);
        }
    } else {
        ctx.error(-1, '找不到该文件', null);
    }
});

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
