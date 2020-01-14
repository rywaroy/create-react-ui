const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const router = new Router();

/**
 * 获取.crui/template下模板文件的目录
 */
router.get('/template', async ctx => {
    const base = path.join(process.cwd(), '.crui', 'template');
    if (fs.existsSync(base)) {
        const file = fs.readdirSync(base);
        if (file.length === 0) {
            ctx.error(0, '该目录下没有文件', null);
        } else {
            const data = [];
            file.forEach((item, index) => {
                if (/^.+\..+$/.test(item)) { // 判断是文件
                    data.push({
                        title: item,
                        key: index + 1,
                        value: item,
                    });
                }
            });
            ctx.success(200, '', data);
        }
    } else {
        ctx.error(0, '找不到/.crui/template文件目录', null);
    }
});

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

module.exports = router;