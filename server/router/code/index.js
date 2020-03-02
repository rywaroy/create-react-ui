const path = require('path');
const fs = require('fs');
const Router = require('koa-router');

const router = new Router();

/**
 * 创建表格代码块
 */
router.get('/table', async ctx => {
    const { url, code } = ctx.query;
    const base = path.join(process.cwd(), url || '');
    if (fs.existsSync(base)) {
        fs.appendFileSync(base, `\n\n${code}`, 'utf8');
        ctx.success(200, '创建成功', null);
    } else {
        ctx.error(0, '找不到该文件', null);
    }
});

/**
 * 创建表单代码块
 */
router.get('/form', async ctx => {
    const { url, code } = ctx.query;
    const base = path.join(process.cwd(), url || '');
    if (fs.existsSync(base)) {
        fs.appendFileSync(base, `\n\n${code}`, 'utf8');
        ctx.success(200, '创建成功', null);
    } else {
        ctx.error(0, '找不到该文件', null);
    }
});

module.exports = router;
