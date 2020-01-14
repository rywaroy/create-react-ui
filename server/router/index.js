const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const file = require('./file');

const router = new Router();

router.use('/api/file', file.routes(), file.allowedMethods());

/**
 * 判断是否是js文件
 */
router.get('/api/file/isjs', async ctx => {
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

module.exports = router;